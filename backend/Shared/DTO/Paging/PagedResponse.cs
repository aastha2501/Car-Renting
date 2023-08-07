using Shared.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO.Paging
{
    public class PagedResponse: ApiResponse
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }   
        public object Data { get; set; }

        //public PagedResponse(object data, int pageNumber, int pageSize)
        //{
        //    this.PageNumber = pageNumber;
        //    this.PageSize = pageSize;
        //    this.Data = data;
        //    this.Success = true;
        //    this.ErrorMessage = null;
        //    this.Message = null;
        //}
    }
}
