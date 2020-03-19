// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using System.Diagnostics;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService.Controllers
{
    public sealed class PrintController : ApiController
    {
        [AcceptVerbs("Post")]
        [Route("print")]
        public async Task<IHttpActionResult> Print()
        {
            string result = await Request.Content.ReadAsStringAsync();
            var obj = JObject.Parse(result);
            PrintingInfo p = obj.ToObject<PrintingInfo>();

            RawPrinter.SendStringToPrinter(p.PrinterName, p.TextToPrint);
            return Ok();
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1812:AvoidUninstantiatedInternalClasses")]
        private class PrintingInfo
        {
            public string PrinterName { get; set; }

            public string TextToPrint { get; set; }
        }
    }
}
