using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using BackendDesafio.Models;
using BackendDesafio.Services;
using Microsoft.Extensions.Options;
namespace BackendDesafio
{
    public class Startup
    {
            private readonly string MyAllowSpecificOrigins = "localhost";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
          
          
        
        

            services.Configure<AnimalsDatabaseSettings>(Configuration.GetSection(nameof(AnimalsDatabaseSettings)));
            services.AddSingleton<IAnimalsDatabaseSettings>(sp => sp.GetRequiredService<IOptions<AnimalsDatabaseSettings>>().Value);
            services.AddSingleton<AnimalService>();
            services.AddCors(c => c.AddPolicy(MyAllowSpecificOrigins, policy => {
                policy.WithOrigins("*")
                .AllowAnyMethod()
                .AllowAnyHeader();
            }));
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BackendDesafio", Version = "v1" });
            });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.2.13.2
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BackendDesafio v1"));
            }
            app.UseCors(MyAllowSpecificOrigins);
            
            app.UseHttpsRedirection();
            app.UseRouting();
       
            



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
