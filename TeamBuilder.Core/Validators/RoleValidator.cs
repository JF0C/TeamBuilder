using FluentValidation;
using TeamBuilder.Core.Constants;

namespace TeamBuilder.Core.Validators;

public static class RoleValidator
{
    public static void Validate(string role)
    {
        if (!Roles.All.Any(r => r == role))
        {
            throw new ValidationException($"Role \"{role}\" does not exist");
        }
    }
}