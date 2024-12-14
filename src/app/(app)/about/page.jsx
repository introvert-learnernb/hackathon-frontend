const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary mb-6">
            About Connect किसान
          </h1>
          <p className="text-lg leading-8 text-gray-600">
            At <strong className="text-primary">Connect किसान</strong>, we are committed to building a
            sustainable ecosystem that bridges the gap between farmers,
            retailers, and consumers. Our platform empowers local farmers by
            providing them with the tools to showcase their products, share
            their stories, and connect with customers who value fresh, locally
            sourced produce.  
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-7">
              Our mission is to promote sustainability and foster a thriving
              ecosystem for local businesses. We believe that farmers are the
              backbone of our economy, and by connecting them directly to
              retailers and consumers, we can help them achieve growth and
              self-reliance.  
            </p>
          </div>

          
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-600 leading-7">
              <li>
                Empower farmers by giving them a platform to showcase their
                produce.  
              </li>
              <li>
                Offer customers transparency about product origins and the
                journey from farm to table.  
              </li>
              <li>
                Promote eco-friendly practices by supporting locally grown
                products.  
              </li>
              <li>
                Strengthen community impact by fostering a connection between
                farmers and consumers.  
              </li>
            </ul>
          </div>

          
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-7">
              We envision a world where local businesses thrive, communities are
              strengthened, and sustainability is at the heart of every
              transaction. By connecting people with farmers, we aim to create a
              future where everyone has access to fresh, high-quality produce
              while supporting the hands that grow it.  
            </p>
          </div>

          
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-600 leading-7">
              At <strong className="text-primary">Connect किसान</strong>, we are dedicated to delivering value to
              farmers, retailers, and customers alike. By focusing on
              transparency, sustainability, and community, we strive to be more
              than just a marketplace—we aim to be a movement for positive
              change.  
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
