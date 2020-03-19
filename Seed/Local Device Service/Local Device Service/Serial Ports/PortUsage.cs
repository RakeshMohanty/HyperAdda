using System;
using System.IO.Ports;
using System.Text;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    public sealed class PortUsage : IDisposable
    {
        public PortUsage(string connectionId, string portName, SerialPort serialPort)
        {
            if (string.IsNullOrEmpty(connectionId))
                throw new ArgumentException($"{nameof(connectionId)} cannot be null or empty", nameof(connectionId));

            if (string.IsNullOrEmpty(portName))
                throw new ArgumentException($"{nameof(portName)} cannot be null or empty", nameof(portName));

            if (serialPort == null)
                throw new ArgumentNullException(nameof(serialPort));

            ConnectionId = connectionId;
            PortName = portName;
            SerialPort = serialPort;

            InputAccumulator = "";
        }

        public string ConnectionId { get; }

        public string PortName { get; }

        public SerialPort SerialPort { get; private set;  }

        public string InputAccumulator { get; set; }

        public void Dispose()
        {
            if(SerialPort != null)
            {
                SerialPort.Dispose();
                SerialPort = null;
            }
        }
    }
}
