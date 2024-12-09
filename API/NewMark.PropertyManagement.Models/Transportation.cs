namespace NewMark.PropertyManagement.Models
{
    /// <summary>
    /// Represents transportation model.
    /// </summary>
    public class Transportation
    {
        public string Type { get; set; }
        public string Line { get; set; }
        public string Distance { get; set; }
        public string Station { get; set; }  // Optional for bike share
    }
}
