"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { tokens } from "@/data/tokens";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Timer } from "@/components/extra/timer";

const ProductDescription = () => {
  const { productsId } = useParams();
  const [product, setProduct] = useState(null);
  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [farmerId, setFarmerId] = useState("");

  const [reviewData, setReviewData] = useState({
    product: productsId,
    rating: 0,
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (event) => {
    setReviewData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    const fetchProductAndFarmerData = async () => {
      try {
        setLoading(true);
        const productResponse = await axiosInstance.get(
          `/public/product-app/products/${productsId}`
        );
        const productData = productResponse;
        setProduct(productData);
        setFarmerId(productResponse.id);

        if (productData?.farmer) {
          setFarmerData(productData.farmer);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    if (productsId) {
      fetchProductAndFarmerData();
    }
  }, [productsId]);

  const handleReview = async (event) => {
    event.preventDefault();

    if (
      !reviewData.rating ||
      !reviewData.name ||
      !reviewData.email ||
      !reviewData.description
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axiosInstance.post(
        "/public/product-app/product-review/create",
        {
          product: parseInt(reviewData.product),
          rating: reviewData.rating,
          reviewMessage: reviewData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        }
      );
      toast.success("Review submitted successfully!");
      setReviewData({
        product: productsId,
        rating: 0,
        name: "",
        email: "",
        description: "",
      });
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const handleLocateSeller = () => {
    if (farmerData?.location) {
      const locationUrl = `https://www.google.com/maps?q=${farmerData.location.lat},${farmerData.location.lng}`;
      window.open(locationUrl, "_blank");
    }
  };

  if (loading) return <ProductSkeleton />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex gap-6">
        <Card className="overflow-hidden flex-1">
          <CardContent className="p-0">
            <div className="flex flex-col gap-6">
              <div className="relative h-80">
                <Image
                  src={
                    product?.featuredImage || "/defaultImage/defaultImage.avif"
                  }
                  alt={product?.name || "Product Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none  w-full"
                />
    <div className="flex flex-col items-center">
      {/* Product Info */}
      <div className="min-h-72 bg-gray-50 flex items-center justify-center px-6 py-7">
        <div className="w-full mb-20 sm:w-1/2 lg:w-1/2 flex justify-center items-center p-6 sm:p-8">
          <img
            src={product?.featuredImage || "/defaultImage/defaultImage.avif"}
            alt={product?.name || "Product Image"}
            className="h-4/6 w-4/6 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="max-w-4xl bg-transparent rounded-lg overflow-hidden flex flex-col sm:flex-row w-full sm:w-1/2 lg:w-2/3 p-6 sm:p-10 -ml-24">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-black mb-6 capitalize pl-2 border-l-8 border-primary">
                {product?.name || "Product Name"}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {product?.description ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
              </p>
            </div>

            <div className="mt-10">
              <div className="flex items-center space-x-6 relative">
                <span className="text-2xl sm:text-3xl font-semibold text-black">
                  NRs {product?.originalPrice || 1000}
                </span>
                <span className="line-through text-gray-400 text-lg absolute bottom-5 left-32">
                  NRs {product?.price || 400}
                </span>
                <p className="text-sm text-gray-500 mt-2 absolute -bottom-5 left-32">
                  per kg
                </p>
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold mb-4">
                    {product?.name || "Product Name"}
                  </CardTitle>
                  <p className="text-gray-600 mb-4">{product?.description}</p>
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      NRs {product?.originalPrice || "1000"}
                    </span>
                    {product?.price && (
                      <p>
                        <span className="text-lg line-through text-gray-500">
                          NRs {product?.price}
                        </span>{" "}
                        per {product.unit}
                      </p>
                    )}
                  </div>
                </div>
                {/* <Button className="w-full md:w-auto">Add to Cart</Button> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {farmerData && (
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Farmer Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="relative h-64">
                  <Image
                    src={farmerData?.photo || "/defaultImage/defaultImage.avif"}
                    alt={farmerData?.name || "Farmer Image"}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <p>
                    <strong>Name:</strong> {farmerData?.fullName || "N/A"}
                  </p>
                  <p>
                    <strong>Contact:</strong> {farmerData?.contactNo || "N/A"}
                  </p>
                  <p>
                    <strong>Business Type:</strong>{" "}
                    {farmerData?.businessType || "N/A"}
                  </p>
                  {farmerData?.backgroundStory && (
                  <h1 className="text-xl sm:text-2xl font-semibold text-black mb-6 capitalize pl-2 border-l-8 border-primary">
                    Farmer Info
                  </h1>
                  <div className="text-gray-600 text-base sm:text-lg leading-relaxed pl-10">
                    <p>
                      <strong>Name:</strong>{" "}
                      {farmerData?.fullName || "Farmer's Name"}{" "}
                    </p>
                    <p>
                      <strong>Contact:</strong> {farmerData?.contactNo || "N/A"}{" "}
                    </p>
                    <p>
                      <strong>Business Type:</strong>{" "}
                      {farmerData?.businessType || "N/A"}{" "}
                    </p>
                    <p>
                      <strong>Background Story:</strong>{" "}
                      {farmerData.backgroundStory}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {farmerData?.location ? (
                <Button onClick={handleLocateSeller}>Locate Seller</Button>
              ) : (
                <p className="text-gray-500">Location not available</p>
              )}
            </CardFooter>
          </Card>
                  </div>
                </div>

                {/* Location and Map */}
                <div className="mt-6 pl-10">
                  {farmerData?.location ? (
                    <button
                      onClick={handleLocateSeller}
                      className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary focus:ring-4 focus:ring-primary transition duration-200"
                    >
                      Locate Seller
                    </button>
                  ) : (
                    <p className="text-gray-500">Location not available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Additional Info & Reviews */}
      <div className="p-6 font-sans bg-gray-50 mx-44 flex gap-7">
        {/* Additional Info Section */}
        {farmerInfo && (
          <>
            <div className="mb-10 bg-white shadow-lg rounded-lg p-6 w-1/2 ">
              <h2 className="text-black uppercase text-2xl font-bold border-b-4 border-primarypb-2 mb-4 inline-block">
                business into :
              </h2>

              <ul className="list-none space-y-4">
                {Object.entries(additionalInfo).map(([key, value], index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <span className="font-semibold w-40 uppercase text-sm text-gray-600">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </span>
                      <span className="ml-2 text-gray-800 text-base">
                        {value}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      {product?.reviews && product.reviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={review.createdBy.photo}
                      alt={review.createdBy.fullName}
                    />
                    <AvatarFallback>
                      {review.createdBy.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        {review.createdBy.fullName}
                      </h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">{review.reviewMessage}</p>
        {/* Reviews Section */}

        <div
          className={`-mb-24 bg-gray-50 rounded-lg p-6 ${
            !farmerInfo ? "w-full" : "w-1/2"
          }`}
        >
          {productWithReview.reviews.length != 0 && (
            <h2 className="text-black text-2xl font-bold border-b-4 border-primary pb-2 mb-4 inline-block">
              REVIEWS :
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productWithReview.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-lg rounded-lg p-6 flex items-start gap-4"
              >
                <img
                  src={
                    review.createdBy.photo || "/defaultImage/unknownImage.jpg"
                  }
                  alt={review.createdBy.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.createdBy.fullName || "Anonymous"}
                  </h3>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < review.rating
                            ? "text-primary"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReview} className="space-y-4">
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() =>
                      setReviewData((prev) => ({ ...prev, rating: star }))
                    }
                    className={`w-6 h-6 cursor-pointer ${
                      reviewData.rating >= star
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                    className="cursor-pointer"
                  >
                    {reviewData.rating >= star ? (
                      <FaStar className="text-primary text-3xl" />
                    ) : (
                      <FaRegStar className="text-gray-300 text-3xl" />
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={reviewData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={reviewData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Review
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write your review here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-primary"
                value={reviewData.description}
                onChange={handleChange}
                placeholder="Write your review"
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Review
            </Button>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={handleReview}
            >
              Submit
            </button>
          </form>
        </CardContent>
      </Card>

      <Timer />
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="container mx-auto px-4 py-8 space-y-8">
    <Card>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className=" animate-pulse h-96 w-full" />
          <div className="space-y-4">
            <div className=" animate-pulse h-8 w-3/4" />
            <div className=" animate-pulse h-4 w-full" />
            <div className=" animate-pulse h-4 w-full" />
            <div className=" animate-pulse h-6 w-1/4" />
            <div className=" animate-pulse h-10 w-1/3" />
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <div className=" animate-pulse h-8 w-1/4" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className=" animate-pulse h-64 w-full md:w-1/3" />
          <div className="flex-1 space-y-4">
            <div className=" animate-pulse h-4 w-full" />
            <div className=" animate-pulse h-4 w-full" />
            <div className=" animate-pulse h-4 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ProductDescription;
