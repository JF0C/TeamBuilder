namespace TeamBuilder.Core.Exceptions;
public class ItemNotFoundException(string id, Type type): Exception(BuildMessage(id, type))
{
    private static string BuildMessage(string id, Type type)
    {
        return $"Item {id} of type {type.FullName} was not found";
    }
}