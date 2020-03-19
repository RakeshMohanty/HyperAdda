using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.IO.Ports;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService.Tests
{
    [TestClass]
    public class SerialPortUtilitiesTests
    {
        [TestMethod]
        public void StringToParityOdd()
        {
            Parity actual = SerialPortUtilities.StringToParity("O");
            Assert.AreEqual(Parity.Odd, actual);

            actual = SerialPortUtilities.StringToParity("odd");
            Assert.AreEqual(Parity.Odd, actual);
        }

        [TestMethod]
        public void StringToParityEven()
        {
            Parity actual = SerialPortUtilities.StringToParity("E");
            Assert.AreEqual(Parity.Even, actual);

            actual = SerialPortUtilities.StringToParity("even");
            Assert.AreEqual(Parity.Even, actual);
        }

        [TestMethod]
        public void StringToParityMark()
        {
            Parity actual = SerialPortUtilities.StringToParity("M");
            Assert.AreEqual(Parity.Mark, actual);

            actual = SerialPortUtilities.StringToParity("mark");
            Assert.AreEqual(Parity.Mark, actual);
        }

        [TestMethod]
        public void StringToParitySpace()
        {
            Parity actual = SerialPortUtilities.StringToParity("S");
            Assert.AreEqual(Parity.Space, actual);

            actual = SerialPortUtilities.StringToParity("space");
            Assert.AreEqual(Parity.Space, actual);
        }

        [TestMethod]
        public void StringToParityNone()
        {
            Parity actual = SerialPortUtilities.StringToParity("N");
            Assert.AreEqual(Parity.None, actual);

            actual = SerialPortUtilities.StringToParity("none");
            Assert.AreEqual(Parity.None, actual);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void StringToParityUnknown()
        {
            SerialPortUtilities.StringToParity("A");
        }

        [TestMethod]
        public void StringToStopBitsOne()
        {
            StopBits actual = SerialPortUtilities.StringToStopBits("1");
            Assert.AreEqual(StopBits.One, actual);
        }

        [TestMethod]
        public void StringToStopBitsOneFive()
        {
            StopBits actual = SerialPortUtilities.StringToStopBits("1.5");
            Assert.AreEqual(StopBits.OnePointFive, actual);
        }

        [TestMethod]
        public void StringToStopBitsTwo()
        {
            StopBits actual = SerialPortUtilities.StringToStopBits("2");
            Assert.AreEqual(StopBits.Two, actual);
        }

        [TestMethod]
        public void StringToStopBitsNone()
        {
            StopBits actual = SerialPortUtilities.StringToStopBits("0");
            Assert.AreEqual(StopBits.None, actual);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void StringToStopBitsUnknown()
        {
            SerialPortUtilities.StringToStopBits("3");            
        }
    }
}
