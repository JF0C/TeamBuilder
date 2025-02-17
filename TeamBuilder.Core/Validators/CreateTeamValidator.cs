using FluentValidation;
using TeamBuilder.Core.Dtos.Teams;

namespace TeamBuilder.Core.Validators;

public class CreateTeamValidator: AbstractValidator<CreateTeamDto>
{
    public CreateTeamValidator()
    {
        RuleFor(x => x.Name).Length(3, 20);
    }
}