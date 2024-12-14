import PropTypes from "prop-types";
import {
  SelectContent,
  SelectTrigger,
  SelectItem,
  Select,
  SelectValue,
} from "../ui/select";

const SortBy = ({ setSortBy }) => {
  return (
    <div className="p-4 rounded-lg mt-6">
      {/* Ratings */}
      <div className="relative">
        {/* <label htmlFor="sortBy">Sort By</label> */}
        <Select
          onValueChange={(value) => setSortBy(value)}
          //   defaultValue="2"
          name="sortBy"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="flex justify-start">
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="ascending">Price : Low to High</SelectItem>
            <SelectItem value="descending">Price : High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortBy;
