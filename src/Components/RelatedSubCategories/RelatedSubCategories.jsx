import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function RelatedSubCategories({ catId, catName }) {
  const [relatedsubcategories, setRelatedSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getSubCategories() {
    if (catId) {
      try {
        setLoading(true);
        let { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`
        );
        setRelatedSubCategories(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getSubCategories();
  }, [catId]);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Loading />
        </div>
      ) : (
        <>
          {relatedsubcategories.length > 0 ? (
            <>
              <h3 className="text-2xl my-5 mb-8 text-center text-main font-semibold">
                {catName} subcategories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {relatedsubcategories.map((relcat) => (
                  <div
                    key={relcat._id}
                    className="border cursor-pointer border-slate-300 rounded-xl hover:shadow-lg hover:shadow-green-700 transition-shadow duration-300"
                  >
                    <h3 className="p-5 text-black text-center text-2xl">
                      {relcat.name}
                    </h3>
                  </div>
                ))}
              </div>
            </>
          ) : (
            catId && (
              <h3 className="text-2xl mt-24 mb-8 text-center text-black font-semibold">
                {catName} has no subcategories
              </h3>
            )
          )}
        </>
      )}
    </>
  );
}
