using API.DTOs;
using API.Entity;
<<<<<<< HEAD
using API.Helpers;
=======
>>>>>>> 929b681754124ca02c81088fac73c6ff8f2352f6
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
 public class UserRepository : IUserRepository
 {
  private readonly DataContext _context;
  private readonly IMapper _mapper;
  public UserRepository(DataContext context, IMapper mapper)
  {
   _mapper = mapper;
   _context = context;

  }

  public async Task<MemberDto> GetMemberAsync(string username)
  {
   return await _context.Users.Where(x => x.UserName == username).ProjectTo<MemberDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
  }

<<<<<<< HEAD
  public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
  {
   var query = _context.Users.AsQueryable();

   query = query.Where(u => u.UserName != userParams.CurrentUsername); // exclude current user from showing in users list
   query = query.Where(u => u.Gender == userParams.Gender);

   var minDOb = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
   var maxDOb = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));
   
   query = query.Where(u => u.DateOfBirth >= minDOb && u.DateOfBirth <= maxDOb);


   return await PagedList<MemberDto>.CreateAsync(query.AsNoTracking().ProjectTo<MemberDto>(_mapper.ConfigurationProvider), userParams.PageNumber, userParams.PageSize);
=======
  public async Task<IEnumerable<MemberDto>> GetMembersAsync()
  {
   return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).ToListAsync();
>>>>>>> 929b681754124ca02c81088fac73c6ff8f2352f6
  }

  public async Task<AppUser> GetUserByIdAsync(int id)
  {
   return await _context.Users.FindAsync(id);
  }

  public async Task<AppUser> GetUserByUsernameAsync(string username)
  {
   return await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == username);
  }

  public async Task<IEnumerable<AppUser>> GetUsersAsync()
  {
   return await _context.Users.Include(p => p.Photos).ToListAsync();
  }

  public async Task<bool> SaveAllAsync()
  {
   return await _context.SaveChangesAsync() > 0;
  }

  public void Update(AppUser user)
  {
   _context.Entry(user).State = EntityState.Modified;
  }
 }
}