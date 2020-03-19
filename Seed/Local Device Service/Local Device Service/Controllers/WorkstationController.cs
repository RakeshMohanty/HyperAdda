// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService.Controllers
{
    public sealed class WorkstationController : ApiController
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")]
        [AcceptVerbs("get")]
        [Route("workstation")]
        public HttpResponseMessage WorkstationId()
        {

            return new HttpResponseMessage
            {
                Content = new StringContent(System.Environment.MachineName + ";" + System.Environment.UserName)
            };
        }
    }
}
