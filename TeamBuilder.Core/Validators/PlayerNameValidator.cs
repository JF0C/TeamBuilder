using System.Text.RegularExpressions;
using FluentValidation;

namespace TeamBuilder.Core.Validators;

public static partial class PlayerNameValidator
{
    [GeneratedRegex("^[a-z0-9äöü _ß-]+$", RegexOptions.IgnoreCase)]
    private static partial Regex AllowedUsernamePattern();

    public static void Validate(string name)
    {
        if (name.Length < 3 || name.Length > 20)
        {
            throw new ValidationException($"The player name must be between 3 and 20 characters long. Got \"{name}\"");
        }
        if (!AllowedUsernamePattern().IsMatch(name))
        {
            throw new ValidationException($"The player name must conform to the pattern {AllowedUsernamePattern()}");
        }
    }
}