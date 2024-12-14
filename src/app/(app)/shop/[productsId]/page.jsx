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
                value={reviewData.description}
                onChange={handleChange}
                placeholder="Write your review"
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
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
