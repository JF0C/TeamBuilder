namespace TeamBuilder.Core.Exceptions;
public class UnauthorizedUserException(long userId, string item, string itemType): Exception(BuildMessage(userId, item, itemType))
{
    private static string BuildMessage(long userId, string item, string itemType)
    {
        return $"User {userId} is not allowed to edit {itemType} \"{item}\", because they did not author or contribute to it";
    }
}