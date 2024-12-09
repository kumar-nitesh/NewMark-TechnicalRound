namespace NewMark.PropertyManagement.Models
{
    /// <summary>
    /// Represents a space within a property.
    /// </summary>
    public class Space
    {
        public string SpaceId { get; set; }
        public string SpaceName { get; set; }
        public List<RentRoll> RentRoll { get; set; } = new List<RentRoll>();
    }
}
