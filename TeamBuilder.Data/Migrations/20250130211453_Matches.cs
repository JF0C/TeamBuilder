using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamBuilder.Data.Migrations
{
    /// <inheritdoc />
    public partial class Matches : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeamEntity",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Score = table.Column<decimal>(type: "decimal(20,10)", precision: 20, scale: 10, nullable: false),
                    MatchEntityId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeamEntity_Matches_MatchEntityId",
                        column: x => x.MatchEntityId,
                        principalTable: "Matches",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PlayerEntityTeamEntity",
                columns: table => new
                {
                    PlayersId = table.Column<long>(type: "bigint", nullable: false),
                    TeamsId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerEntityTeamEntity", x => new { x.PlayersId, x.TeamsId });
                    table.ForeignKey(
                        name: "FK_PlayerEntityTeamEntity_Players_PlayersId",
                        column: x => x.PlayersId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerEntityTeamEntity_TeamEntity_TeamsId",
                        column: x => x.TeamsId,
                        principalTable: "TeamEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlayerEntityTeamEntity_TeamsId",
                table: "PlayerEntityTeamEntity",
                column: "TeamsId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamEntity_MatchEntityId",
                table: "TeamEntity",
                column: "MatchEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerEntityTeamEntity");

            migrationBuilder.DropTable(
                name: "TeamEntity");

            migrationBuilder.DropTable(
                name: "Matches");
        }
    }
}
