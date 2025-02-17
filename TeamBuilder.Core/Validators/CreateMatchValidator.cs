using FluentValidation;
using TeamBuilder.Core.Dtos.Matches;

namespace TeamBuilder.Core.Validators;

public class CreateMatchValidator: AbstractValidator<CreateMatchDto>
{
    public CreateMatchValidator()
    {
        RuleFor(x => x.Teams.Count).InclusiveBetween(2, 10);
        RuleForEach(x => x.Teams).SetValidator(new CreateTeamValidator());
    }
}