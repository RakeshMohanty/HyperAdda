// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using System;
using System.IO.Ports;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    public static class SerialPortUtilities
    {
        public static Parity StringToParity(string parity)
        {
            switch (parity.ToUpper()[0])
            {
                case 'O': return Parity.Odd;
                case 'E': return Parity.Even;
                case 'M': return Parity.Mark;
                case 'S': return Parity.Space;
                case 'N': return Parity.None;
                default: throw new ArgumentException("Unknow parity", nameof(parity));
            }
        }

        public static StopBits StringToStopBits(string stopBits)
        {
            switch (stopBits)
            {
                case "0": return StopBits.None;
                case "1": return StopBits.One;
                case "1.5": return StopBits.OnePointFive;
                case "2": return StopBits.Two;
                default: throw new ArgumentException("Unkown Stop Bits", nameof(stopBits));
            }
        }

    }
}
