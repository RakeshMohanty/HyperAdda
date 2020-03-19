// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using NLog;
using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    public static class RawPrinter
    {
        private static readonly Logger log = LogManager.GetLogger("RawPrinter");

        public static bool SendStringToPrinter(string printerName, string value)
        {
            log.Trace("Send to Printer :" + printerName);
            log.Trace(Environment.NewLine + value);
            
            if (printerName.StartsWith("debugPrinter", StringComparison.InvariantCultureIgnoreCase))
            {
                log.Info("debugPrinter printed something {0} characters long.", value.Length, false);
                return true;
            }

            MemoryStream ms = new MemoryStream();
            TextWriter sw = new StreamWriter(ms);
            sw.Write(value);
            sw.Dispose();
            Byte[] bytes = ms.ToArray();
            int nLength = bytes.Length;

            bool success = false;

            // Unmanaged pointer.
            IntPtr ptrUnmanagedBytes = new IntPtr(0);

            // Allocate some unmanaged memory for those bytes.
            ptrUnmanagedBytes = Marshal.AllocCoTaskMem(nLength);

            // Copy the managed byte array into the unmanaged array.
            Marshal.Copy(bytes, 0, ptrUnmanagedBytes, nLength);

            // Send the unmanaged bytes to the printer.
            success = SendBytesToPrinter(printerName.Trim(), ptrUnmanagedBytes, nLength);

            // Free the unmanaged memory that you allocated earlier.
            Marshal.FreeCoTaskMem(ptrUnmanagedBytes);
            return success;
        }

        /// <summary>
        /// This function gets the printer name and an unmanaged array of bytes, the function sends those bytes to the print queue.
        /// </summary>
        /// <param name="szPrinterName">Printer Name</param>
        /// <param name="pBytes">No. of bytes in the pdf file</param>
        /// <param name="dwCount">Word count</param>
        /// <returns>True on success, false on failure</returns>
        private static bool SendBytesToPrinter(string szPrinterName, IntPtr pBytes, Int32 dwCount)
        {
            Int32 dwWritten = 0;
            IntPtr hPrinter = new IntPtr(0);
            NativeMethods.DOCINFO di = new NativeMethods.DOCINFO();
            bool success = false;

            di.pDocName = "PDF Document";
            di.pDataType = "RAW";

            if (NativeMethods.OpenPrinter(szPrinterName, out hPrinter, IntPtr.Zero))
            {
                if (NativeMethods.StartDocPrinter(hPrinter, 1, di))
                {
                    if (NativeMethods.StartPagePrinter(hPrinter))
                    {
                        success = NativeMethods.WritePrinter(hPrinter, pBytes, dwCount, out dwWritten);
                        NativeMethods.EndPagePrinter(hPrinter);
                    }
                    NativeMethods.EndDocPrinter(hPrinter);
                }
                NativeMethods.ClosePrinter(hPrinter);
            }

            if (success == false)
            {
                //Marshal.GetLastWin32Error();
            }
            return success;
        }
    }

}