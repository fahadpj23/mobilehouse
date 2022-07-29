import Nav from "components/Home/Nav";

const ShippingPolicy = () => {
  return (
    <div>
      <Nav />
      <div className="flex justify-center py-5">
        <div className="w-8/12  space-y-4">
          <h1 className="font-bold text-xl">SHIPPING POLICY </h1>

          <h1 className="text-lg font-bold">IS SHIPPING FREE?</h1>

          <div className="space-y-5">
            <div>
              Shipping is free WORLDWIDE on most items. On some items, we have
              Free Shipping over $35
            </div>
            <div>
              <h1 className="font-semibold text-lg">WHY IS MY ORDER BEING SHIPPED IN DIFFERENT PACKAGES?</h1>
               If you have a
              multi-item order, each item may be shipped from the a different
              international warehouse, depending on which one has them available
              the fastest. Alternatively, if an item is popular and on a bit of
              a back order, we might ship your items at different times, in
              different packages, to prevent holding up your order and to get it
              to you as fast as possible!
            </div>
            <div>
            <h1 className="font-semibold text-lg">WHEN WILL I RECEIVE MY ORDER?</h1>
               Orders are shipped out directly from
              any of our many domestic & international warehouses and they will
              do everything they can to get you your order as fast as they can!
              Due to the popularity of our offers, please allow an estimated 1-5
              weeks for your order to arrive to the USA (varies from product to
              product). Other countries can take an estimated 1-6 weeks (varies
              from product to product) due to distance traveling and customs.
              Please note, that due to the extreme popularity of our offers,
              these are only estimates.
            </div>
            <div>
            <h1 className="font-semibold text-lg">WHAT HAPPENS IF MY ORDER GETS STUCK OR LOST IN THE MAIL? </h1>
              All of
              our orders are sent with insured shipping and handling. If an
              order gets stuck at customs, sent back or even lost during the
              delivery process, we apologize! The postal service is out of our
              control. However, in cases like this, because the packages are
              insured, we will send you a new package with quicker shipping and
              full tracking, if possible. Please see our refund and return
              policy for when these might be applicable to shipping situations.
            </div>
            <div>
            <h1 className="font-semibold text-lg"> WILL I BE CHARGED FOR CUSTOMS AND TAXES? </h1>
              The prices displayed on
              our site are tax-free in USD, which means you may be liable to pay
              for duties and taxes once you receive your order. Import taxes,
              duties and related customs fees may be charged once your order
              arrives to its final destination, which are determined by your
              local customs office. Payment of these charges and taxes are your
              responsibility and will not be covered by us. We are not
              responsible for delays caused by the customs department in your
              country. For further details of charges, please contact your local
              customs office.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShippingPolicy;
