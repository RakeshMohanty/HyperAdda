// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using Microsoft.AspNet.SignalR;
using NLog;
using System;
using System.IO.Ports;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    public sealed class SerialPortManager : IDisposable
    {
        private readonly static Lazy<SerialPortManager> _instance = new Lazy<SerialPortManager>(() => new SerialPortManager());
        private static readonly Logger log = LogManager.GetLogger("SerialPortManager");
        private readonly IHubContext _hubContext;

        private readonly PortUsages _portUsages = new PortUsages();

        public SerialPortManager()
        {
            log.Trace("SerialPortManager initializing.");
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<SerialPortHub>();
        }

        public void Open(string connectionId, string portName, int baud, string parity, int dataBits, string stopBits)
        {
            log.Trace($"SerialPortManager opening port {portName} ({baud}/{parity}/{dataBits}/{stopBits}) for {connectionId}.");

            if (_portUsages.IsPortInUse(portName))
            {
                log.Trace($"Port {portName} is already in use.");
                throw new InvalidOperationException($"Port {portName} is already in use.");
            }

            try
            {
                SerialPort serialPort = new SerialPort(portName, baud, SerialPortUtilities.StringToParity(parity), dataBits, SerialPortUtilities.StringToStopBits(stopBits));
                serialPort.DtrEnable = true;
                serialPort.DataReceived += _serialPort_DataReceived;
                serialPort.Open();
                _portUsages.AddUsage(connectionId, portName, serialPort);

                log.Trace($"SerialPortManager opened port {portName} for {connectionId}");
            }
            catch (Exception e)
            {
                log.Error(e, "SerialPortManager failed to open port.");
                throw;
            }
        }

        public void Send(string connectionId, string textToSend)
        {
            log.Trace($"SerialPortManager attempting send of \\{textToSend}\\.");

            if (!_portUsages.ExistsFor(connectionId))
            {
                log.Trace($"Connection {connectionId} has no open port, and therefore nothing can be sent.");
                throw new InvalidOperationException($"Connection {connectionId} has no open port, and therefore nothing can be sent.");
            }

            PortUsage pu = _portUsages.FromConnectionId(connectionId);
            log.Trace($"sending to port {pu.PortName}");

            pu.SerialPort.Write(textToSend);
            log.Trace($"SerialPortManager sent \\{textToSend}\\ to port {pu.PortName}.");
        }

        public void Close(string connectionId)
        {
            log.Trace($"SerialPortManager closing all ports for connection {connectionId}");

            try
            {
                if (_portUsages.ExistsFor(connectionId))
                {
                    _portUsages.RemoveUsage(connectionId);
                    log.Trace($"SerialPortManager closed ports for {connectionId}");
                }
                else
                    log.Trace($"Connection {connectionId} had no open ports anyway.");                
            }
            catch (Exception e)
            {
                log.Error(e, $"SerialPortManager failed to close ports for connection {connectionId}");
                throw;
            }
        }

        public void Close(string connectionId, string portName)
        {
            log.Trace($"SerialPortManager closing port {portName} for connection {connectionId}");

            try
            {
                _portUsages.RemoveUsage(connectionId, portName);
                log.Trace($"SerialPortManager closed port {portName} for connection {connectionId}");
            }
            catch (Exception e)
            {
                log.Error(e, $"SerialPortManager failed to close port {portName} for connection {connectionId}");
                throw;
            }
        }

        private void _serialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            SerialPort sp = (SerialPort)sender;
            string data = sp.ReadExisting();
            log.Trace("Received : " + data);
            PortUsage pu = _portUsages.FromPort(sp);

            pu.InputAccumulator += data;
            if (pu.InputAccumulator.Contains(sp.NewLine))
            {
                log.Trace("Sent : " + pu.InputAccumulator);
                int eol = pu.InputAccumulator.IndexOf(sp.NewLine);
                string line = pu.InputAccumulator.Substring(0, eol + 1);
                eol = pu.InputAccumulator.LastIndexOf(sp.NewLine);
                pu.InputAccumulator = pu.InputAccumulator.Substring(eol + 1);
                _hubContext.Clients.Client(pu.ConnectionId).dataReceived(sp.PortName, line);
            }
        }

        public static SerialPortManager Instance
        {
            get { return _instance.Value; }
        }

        public void Dispose()
        {
            log.Trace($"SerialPortManager is Disposing");

            if (_portUsages != null)
                _portUsages.Dispose();
        }
    }
}
