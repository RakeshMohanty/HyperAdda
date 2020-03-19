// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using Microsoft.AspNet.SignalR;
using NLog;
using System.Threading.Tasks;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    public class SerialPortHub : Hub
#pragma warning restore CS3009 // Base type is not CLS-compliant
    {
        private readonly SerialPortManager _serialPortManager;
        private static readonly Logger log = LogManager.GetLogger("SerialPortHub");

        public SerialPortHub() : this(SerialPortManager.Instance)
        { }

        public SerialPortHub(SerialPortManager serialPortManager)
        {
            _serialPortManager = serialPortManager;
        }

        public void Open(string portName, int baud, string parity, int dataBits, string stopBits)
        {
            _serialPortManager.Open(Context.ConnectionId, portName, baud, parity, dataBits, stopBits);
        }

        public void Send(string textToSend)
        {
            _serialPortManager.Send(Context.ConnectionId, textToSend);
        }

        public void Close(string portName)
        {
            _serialPortManager.Close(Context.ConnectionId, portName);
        }

        public override Task OnConnected()
        {
            log.Trace("SerialPortManager OnConnected called");
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            log.Trace("SerialPortManager OnDisconnected called");
            _serialPortManager.Close(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            log.Trace("SerialPortManager OnReconnected called");
            return base.OnReconnected();
        }
    }
}
