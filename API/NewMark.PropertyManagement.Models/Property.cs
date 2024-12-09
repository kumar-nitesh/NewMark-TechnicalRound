namespace NewMark.PropertyManagement.Models
{

    /// <summary>
    /// Represents a property with the necessary details.
    /// </summary>
    public class Property
    {
        public string PropertyId { get; set; }
        public string PropertyName { get; set; }
        public List<string> Features { get; set; } = new List<string>();
        public List<string> Highlights { get; set; } = new List<string>();
        public List<Transportation> Transportation { get; set; } = new List<Transportation>();
        public List<Space> Spaces { get; set; } = new List<Space>();
    }
}