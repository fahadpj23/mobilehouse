import Nav from "components/Home/Nav";

const AboutUs = () => {
  return (
    <div>
      <Nav />
      <div className="flex justify-center mt-5">
        <div className="w-8/12  space-y-4">
          <h1 className="font-bold text-xl">ABOUT US </h1>

          <div className="space-y-5">
            Every month, My Mobile House creates unique items and products.
             My Mobile House is an Indian company shipping to INDIAN customers committed to
            deliver Innovation and Convenience to its customers.
             We are your one
            stop destination to all your daily needs - spreading positivity and
            creativity with our unique finds. 
            We started in 2018 and it is our
            mission to only list the BEST and most AFFORDABLE items on this
            website. You, our customers, drive us to be really picky in choosing
            what products to offer. If you don’t see something list on this web
            store, it's probably because we didn't think much of it or we never
            encountered it in our search. If you do find a unique product worthy
            of being listed here, reach out to us. 
            <h1 className="font-semibold text-lg">Connect with us on social</h1>
            media! Share your experience with us by sending a picture or video
            of yourself with the shiny new product you bought from us. We're
            always looking forward to reading your reviews and suggestions.
            Let's make it happen! A GUARANTEE We're so confident you'll love our
            products - we offer Free and Paid shipping and a 100% satisfaction
            guarantee. Don't like something you bought? Tell us, and we'll be
            happy to issue a full refund. 
            <h1 className="font-semibold text-lg">HAVE ANY QUESTIONS? </h1>
            Contact us now
            using our contact page, or email us at support@myMobile House.com Happy
            shopping! The My Mobile House Team
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
