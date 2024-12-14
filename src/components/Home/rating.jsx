import PropTypes from "prop-types";
import {
  SelectContent,
  SelectTrigger,
  SelectItem,
  Select,
  SelectValue,
} from "../ui/select";

const Ratings = ({ onRatingSelect }) => {
  const handleClearFilter = () => {
    onRatingSelect(null);
  };

  return (
    <div className="ratings bg-white p-4 rounded-lg mt-2">
      <div className="relative">
        <Select onValueChange={(value) => onRatingSelect(parseInt(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">⭐</SelectItem>
            <SelectItem value="2">⭐⭐</SelectItem>
            <SelectItem value="3">⭐⭐⭐</SelectItem>
            <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
            <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        className="mt-8 bg-primary border-2 border-transparent text-white px-5 py-2 rounded-lg hover:bg-transparent hover:border-2 hover:border-primary hover:text-primary transition-all duration-300"
        onClick={handleClearFilter}
      >
        Clear Filter
      </button>
    </div>
  );
};

Ratings.propTypes = {
  onRatingSelect: PropTypes.func,
};

Ratings.defaultProps = {
  onRatingSelect: () => {},
};

export default Ratings;
