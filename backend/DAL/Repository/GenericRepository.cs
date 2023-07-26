using DAL.DbContextClass;
using DAL.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApplicationContext _dbContext;
        private DbSet<T> table = null;

        public GenericRepository(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
            table = dbContext.Set<T>();
          

        }

        //public async Task<T> GetUserById(object id)
        //{
        //    var user = await _userManager.GetUserIdAsync(id);
        //    return user;
        //}
        public async Task<T> GetById(object id)
        {
            return table.Find(id);
        }

        public IQueryable<T> GetAll()
        {
            IQueryable<T> set = table;
            return set;
        }

        public async Task AddAsync(T entity)
        {
            await table.AddAsync(entity);
            _dbContext.SaveChanges();
        }

        public async Task UpdateAsync(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);
            _dbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
        public void Save()
        {
            _dbContext.SaveChanges();
        }
        public async Task<IQueryable<T>> AsQueryable()
        {
            return await Task.Run(() =>
            {
                return _dbContext.Set<T>().AsQueryable().AsNoTracking();
            });
        }
        public async Task<IEnumerable<T>> Includes(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = table.Include(includes[0]);
            foreach (var include in includes.Skip(1))
            {
                query = query.Include(include);
            }
            return (IEnumerable<T>)query.ToListAsync();
        }

        //public async Task<T> GetByIdAsync(Guid id, params Expression<Func<T, object>>[] includes)
        //{
        //    var result = GetAll();
        //    if (includes.Any())
        //    {
        //        foreach (var include in includes)
        //        {
        //            result = result.Include(include);
        //        }
        //    }
        //    return await result.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        //}
        public T GetFirstOrDefaultBy(Expression<Func<T, bool>> condition)
        {
            return _dbContext.Set<T>().Where(condition).FirstOrDefault(); ;
        }

    }
}
