using System.ComponentModel.DataAnnotations;

namespace TeamBuilder.Core.Entities;

public class TeamEntity
{
    public long Id { get; set; }
    
    [MaxLength(20)]
    public string Name { get; set; } = string.Empty;
    public List<PlayerEntity> Players { get; set; } = [];
    public decimal Score { get; set; }
}