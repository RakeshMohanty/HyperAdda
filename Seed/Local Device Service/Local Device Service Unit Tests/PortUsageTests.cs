using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO.Ports;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService.Tests
{
    // test 
    [TestClass]
    public class PortUsageTests
    {
        [TestMethod]
        public void PortUsageConstructor()
        {
            using (SerialPort port = new SerialPort())
            {
                PortUsage actual = new PortUsage("ConnId", "PortName", port);

                Assert.AreEqual("ConnId", actual.ConnectionId);
                Assert.AreEqual("PortName", actual.PortName);
                Assert.AreEqual(port, actual.SerialPort);
            }
        }
    }
}
