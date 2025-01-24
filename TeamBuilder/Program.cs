using System.Text.Json.Serialization;
using TeamBuilder.Shared;
using TourViewer.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

builder.Services.AddCorsPolicies();

builder.Services.AddControllers(x => x.Filters.Add<ExceptionFilter>())
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddSpaRoot();

var app = builder.Build();

app.UseSpa();

app.MapControllers();

app.Run();
