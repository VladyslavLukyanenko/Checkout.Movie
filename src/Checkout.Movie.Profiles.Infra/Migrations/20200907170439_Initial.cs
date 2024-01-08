using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Checkout.Movie.Profiles.Infra.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence(
                name: "profile_hi_lo_sequence",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "profile_sharing_token_hi_lo_sequence",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "role_hi_lo_sequence",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "user_claim_hi_lo_sequence",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "user_hi_lo_sequence",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SequenceHiLo),
                    name = table.Column<string>(maxLength: 256, nullable: true),
                    normalized_name = table.Column<string>(maxLength: 256, nullable: true),
                    concurrency_stamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SequenceHiLo),
                    created_at = table.Column<DateTimeOffset>(nullable: false),
                    updated_at = table.Column<DateTimeOffset>(nullable: false),
                    updated_by = table.Column<long>(nullable: true),
                    created_by = table.Column<long>(nullable: true),
                    concurrency_stamp = table.Column<string>(nullable: true),
                    lockout_end = table.Column<DateTimeOffset>(nullable: true),
                    discord_id = table.Column<long>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    user_name = table.Column<string>(maxLength: 256, nullable: true),
                    normalized_user_name = table.Column<string>(maxLength: 256, nullable: true),
                    email = table.Column<string>(maxLength: 256, nullable: true),
                    normalized_email = table.Column<string>(maxLength: 256, nullable: true),
                    is_email_confirmed = table.Column<bool>(nullable: true),
                    password_hash = table.Column<string>(nullable: true),
                    security_stamp = table.Column<string>(nullable: true),
                    lockout_enabled = table.Column<bool>(nullable: false),
                    access_failed_count = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_user_created_by",
                        column: x => x.created_by,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_user_user_updated_by",
                        column: x => x.updated_by,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "profile",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SequenceHiLo),
                    user_id = table.Column<long>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    card_number = table.Column<string>(nullable: true),
                    cvv = table.Column<string>(nullable: true),
                    expiry = table.Column<string>(nullable: true),
                    shipping_address_first_name = table.Column<string>(nullable: true),
                    shipping_address_last_name = table.Column<string>(nullable: true),
                    shipping_address_address_line1 = table.Column<string>(nullable: true),
                    shipping_address_address_line2 = table.Column<string>(nullable: true),
                    shipping_address_city = table.Column<string>(nullable: true),
                    shipping_address_phone_number = table.Column<string>(nullable: true),
                    shipping_address_post_code = table.Column<string>(nullable: true),
                    shipping_address_country_id = table.Column<string>(nullable: true),
                    shipping_address_province_code = table.Column<string>(nullable: true),
                    billing_address_first_name = table.Column<string>(nullable: true),
                    billing_address_last_name = table.Column<string>(nullable: true),
                    billing_address_address_line1 = table.Column<string>(nullable: true),
                    billing_address_address_line2 = table.Column<string>(nullable: true),
                    billing_address_city = table.Column<string>(nullable: true),
                    billing_address_phone_number = table.Column<string>(nullable: true),
                    billing_address_post_code = table.Column<string>(nullable: true),
                    billing_address_country_id = table.Column<string>(nullable: true),
                    billing_address_province_code = table.Column<string>(nullable: true),
                    are_addresses_same = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_profile", x => x.id);
                    table.ForeignKey(
                        name: "fk_profile_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_claim",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SequenceHiLo),
                    user_id = table.Column<long>(nullable: false),
                    claim_type = table.Column<string>(nullable: true),
                    claim_value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_claim", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_claim_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_role",
                columns: table => new
                {
                    user_id = table.Column<long>(nullable: false),
                    role_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_role", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "fk_user_role_role_role_id",
                        column: x => x.role_id,
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_role_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "profile_sharing_token",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SequenceHiLo),
                    profile_id = table.Column<long>(nullable: false),
                    token = table.Column<string>(nullable: false),
                    requires_authorization = table.Column<bool>(nullable: false),
                    granted_access_at = table.Column<DateTimeOffset>(nullable: true),
                    requested_authorization_at = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_profile_sharing_token", x => x.id);
                    table.ForeignKey(
                        name: "fk_profile_sharing_token_profile_profile_id",
                        column: x => x.profile_id,
                        principalTable: "profile",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_profile_user_id",
                table: "profile",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_profile_sharing_token_profile_id",
                table: "profile_sharing_token",
                column: "profile_id");

            migrationBuilder.CreateIndex(
                name: "role_name_index",
                table: "role",
                column: "normalized_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "email_index",
                table: "user",
                column: "normalized_email");

            migrationBuilder.CreateIndex(
                name: "ix_user_created_by",
                table: "user",
                column: "created_by");

            migrationBuilder.CreateIndex(
                name: "user_name_index",
                table: "user",
                column: "normalized_user_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_updated_by",
                table: "user",
                column: "updated_by");

            migrationBuilder.CreateIndex(
                name: "ix_user_claim_user_id",
                table: "user_claim",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_role_role_id",
                table: "user_role",
                column: "role_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "profile_sharing_token");

            migrationBuilder.DropTable(
                name: "user_claim");

            migrationBuilder.DropTable(
                name: "user_role");

            migrationBuilder.DropTable(
                name: "profile");

            migrationBuilder.DropTable(
                name: "role");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropSequence(
                name: "profile_hi_lo_sequence");

            migrationBuilder.DropSequence(
                name: "profile_sharing_token_hi_lo_sequence");

            migrationBuilder.DropSequence(
                name: "role_hi_lo_sequence");

            migrationBuilder.DropSequence(
                name: "user_claim_hi_lo_sequence");

            migrationBuilder.DropSequence(
                name: "user_hi_lo_sequence");
        }
    }
}
