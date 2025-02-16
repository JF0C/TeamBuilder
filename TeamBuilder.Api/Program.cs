using System.Text.Json.Serialization;
using TeamBuilder.Api.Shared;
using TeamBuilder.Api.Extensions;
using TeamBuilder.Data.Extensions;
using TeamBuilder.Core.Extensions;
using TeamBuilder.Services.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddTeamBuilderDbContext(builder.Configuration);
builder.Services.AddTeamBuilderServices(builder.Configuration);

builder.Services.AddMapper();

builder.Services.AddSwaggerGen();

builder.Services.AddCorsPolicies();

builder.Services.AddControllers(x => x.Filters.Add<ExceptionFilter>())
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSpaRoot();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

await app.EnsureMigration();

app.UseSpa();

app.ActivateCorsPolicy();

app.MapControllers();

app.Run();
