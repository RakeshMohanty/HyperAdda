using System;
using System.IO.Ports;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    internal static class SerialPortUtils
    {
        public static Parity StringToParity(string parity)
        {
            switch (parity[0])
            {
                case 'O':
                    return Parity.Odd;

                case 'E':
                    return Parity.Even;

                case 'M':
                    return Parity.Mark;

                case 'S':
                    return Parity.Space;

                case 'N':
                    return Parity.None;

                default:
                    throw new ArgumentException("Unknow parity", "parity");
            }
        }

        public static StopBits StringToStopBits(string stopBits)
        {
            switch (stopBits)
            {
                case "0":
                    return StopBits.None;
                case "1":
                    return StopBits.One;
                case "1.5":
                    return StopBits.OnePointFive;
                case "2":
                    return StopBits.Two;
                default:
                    throw new ArgumentException("Unkown Stop Bits", "stopBits");
            }
        }
    }
}
