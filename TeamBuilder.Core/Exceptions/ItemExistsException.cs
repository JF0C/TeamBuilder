namespace TeamBuilder.Core.Exceptions;

public class ItemExistsException(string name, Type type, string? property = null): Exception(BuildMessage(name, type, property))
{
    private static string BuildMessage(string name, Type type, string? property)
    {
        return $"Item with {property ?? "name"} \"{name}\" of type {type.FullName} already exists";
    }
}