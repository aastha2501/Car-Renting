using DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task AddAsync(T entity);
        Task<T> GetById(object id);
        Task UpdateAsync(T entity);
        Task Delete(object id);
        Task DeleteAsync(T entity);
        void Save();
        IQueryable<T> GetAll();
        Task<IQueryable<T>> AsQueryable();
        Task<IEnumerable<T>> Includes(params Expression<Func<T, object>>[] includes);
        T GetFirstOrDefaultBy(Expression<Func<T, bool>> condition);
    }
}
