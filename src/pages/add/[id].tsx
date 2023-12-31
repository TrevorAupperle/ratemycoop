import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ErrorMessage from "~/components/ErrorMessage";
import Footer from "~/components/Footer";
import MultiSelectBox from "~/components/MultiSelectBox";
import Navbar from "~/components/Navbar";
import RatingSlider from "~/components/RatingSlider";
import ReviewTextArea from "~/components/ReviewTextArea";
import ToggleButton from "~/components/ToggleButton";
import { api } from "~/utils/api";
import classNames from "~/utils/classNames";

const AddRating = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ambassadorId, setAmbassadorId] = useState<number>(-1);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [knowledgeRating, setKnowledgeRating] = useState<number>(0);
  const [wouldRecommend, setWouldRecommend] = useState<number>(-1);
  const [jokes, setJokes] = useState<boolean>(false);
  const [friendly, setFriendly] = useState<boolean>(false);
  const [inspirational, setInspirational] = useState<boolean>(false);
  const [easyCommunication, setEasyCommunication] = useState<boolean>(false);
  const [selectedMajors, setSelectedMajors] = useState<number[]>([]);
  const [reviewValue, setReviewValue] = useState<string>("");
  const [reviewError, setReviewError] = useState<boolean>(false);
  const [checkingProfanity, setCheckingProfanity] = useState<boolean>(false);
  const [submitCheck, setSubmitCheck] = useState<boolean>(false);
  const [showSumbitError, setShowSubmitError] = useState<boolean>(false);

  const ambassador = api.ambassador.getAmbassadorName.useQuery(
    {
      id: ambassadorId,
    },
    { refetchOnWindowFocus: false },
  );

  const addRatings = api.rating.addRating.useMutation();

  const majors = api.major.getAllMajors.useQuery();

  useEffect(() => {
    if (typeof id === "string") {
      const parsedId = parseInt(id);
      if (!isNaN(parsedId)) {
        setAmbassadorId(parsedId);
      }
    } else if (Array.isArray(id)) {
      setAmbassadorId(-1);
    } else {
      setAmbassadorId(-1);
    }
  }, [id]);

  useEffect(() => {
    if (
      ambassadorId !== -1 &&
      overallRating !== 0 &&
      knowledgeRating !== 0 &&
      wouldRecommend !== -1 &&
      selectedMajors.length !== 0 &&
      reviewValue.length !== 0 &&
      reviewError === false &&
      checkingProfanity === false
    ) {
      setSubmitCheck(true);
    } else {
      setSubmitCheck(false);
    }
  }, [
    ambassadorId,
    overallRating,
    knowledgeRating,
    wouldRecommend,
    selectedMajors,
    reviewValue,
    reviewError,
    checkingProfanity,
  ]);

  const handleSubmit = () => {
    if (submitCheck) {
      addRatings.mutate(
        {
          ambassadorId: ambassadorId,
          rating: overallRating,
          knowledgeRating: knowledgeRating,
          wouldRecommend: wouldRecommend,
          jokes: jokes,
          friendly: friendly,
          inspirational: inspirational,
          easyCommunication: easyCommunication,
          review: reviewValue,
          majors: selectedMajors.map((majorId) => {
            return {
              id: majorId,
              name:
                majors.data?.find((major) => major.id === majorId)?.name ??
                "Unknown",
            };
          }),
        },
        {
          onSuccess: () => {
            void router.push(`/ambassador/${ambassadorId}`);
          },
          onError: () => {
            setTimeout(() => {
              setShowSubmitError(true);
            }, 500);
            setTimeout(() => {
              setShowSubmitError(false);
            }, 5000);
          },
        },
      );
    }
  };

  return (
    <>
      <Head>
        <title>Add a Rating | RateMyCoop</title>
        <meta name="description" content="Generated by create-t3-app" />
        <meta name="theme-color" content="#0b2341" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#0b2341" />
        <link rel="icon" href="/AuburnCupola.ico" />
      </Head>
      <div className="flex min-h-screen flex-col text-auburnBlue-900">
        <Navbar />
        <div className="flex w-full flex-col items-center py-4 shadow">
          <div className="w-full max-w-5xl px-6 lg:px-0">
            <h2 className="text-xl font-bold">
              Rating: {ambassador.data?.name}
            </h2>
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col items-center pb-8">
          <div className="w-full max-w-5xl px-6 lg:px-0">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="font-semibold">
                  What major(s) did you tour?{" "}
                  <span className="text-red-500">*</span>
                </div>
                <MultiSelectBox
                  majors={majors.data ?? []}
                  selected={selectedMajors}
                  setSelected={setSelectedMajors}
                />
              </div>
              <div className="flex w-full flex-col gap-2 lg:w-2/3">
                <div className="font-semibold">
                  Rate your Cupola ambassador{" "}
                  <span className="text-red-500">*</span>
                </div>
                <RatingSlider
                  rating={overallRating}
                  setRating={setOverallRating}
                />
              </div>
              <div className="flex w-full flex-col gap-2 lg:w-2/3">
                <div className="font-semibold">
                  Rate your Cupola ambassador&apos;s knowledge on the College of
                  Engineering <span className="text-red-500">*</span>
                </div>
                <RatingSlider
                  rating={knowledgeRating}
                  setRating={setKnowledgeRating}
                />
              </div>
              <div className="flex w-full flex-col gap-2 lg:w-1/2">
                <div className="font-semibold">
                  Would you recommend this ambassador to someone else?{" "}
                  <span className="text-red-500">*</span>
                </div>
                <ToggleButton
                  selected={wouldRecommend}
                  setSelected={setWouldRecommend}
                />
              </div>
              <div className="flex w-full flex-col gap-2 lg:w-1/2">
                <div className="font-semibold">
                  Select tags that describe your ambassador
                </div>
                <div className="flex items-center gap-4 overflow-auto">
                  <button
                    className={classNames(
                      "whitespace-nowrap rounded-full px-4 py-2 text-sm",
                      jokes
                        ? "bg-auburnBlue-900 text-white"
                        : "bg-gray-200 text-auburnBlue-900",
                    )}
                    onClick={() => setJokes(!jokes)}
                  >
                    Told Jokes
                  </button>
                  <button
                    className={classNames(
                      "whitespace-nowrap rounded-full px-4 py-2 text-sm",
                      friendly
                        ? "bg-auburnBlue-900 text-white"
                        : "bg-gray-200 text-auburnBlue-900",
                    )}
                    onClick={() => setFriendly(!friendly)}
                  >
                    Friendly
                  </button>
                  <button
                    className={classNames(
                      "whitespace-nowrap rounded-full px-4 py-2 text-sm",
                      inspirational
                        ? "bg-auburnBlue-900 text-white"
                        : "bg-gray-200 text-auburnBlue-900",
                    )}
                    onClick={() => setInspirational(!inspirational)}
                  >
                    Inspirational
                  </button>
                  <button
                    className={classNames(
                      "whitespace-nowrap rounded-full px-4 py-2 text-sm",
                      easyCommunication
                        ? "bg-auburnBlue-900 text-white"
                        : "bg-gray-200 text-auburnBlue-900",
                    )}
                    onClick={() => setEasyCommunication(!easyCommunication)}
                  >
                    Easy Communication
                  </button>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 lg:w-2/3">
                <div className="font-semibold">
                  Write a review <span className="text-red-500">*</span>
                </div>
                <ReviewTextArea
                  value={reviewValue}
                  setValue={setReviewValue}
                  error={reviewError}
                  setError={setReviewError}
                  checkingProfanity={checkingProfanity}
                  setCheckingProfanity={setCheckingProfanity}
                />
              </div>
              <div className="flex w-full items-center gap-4 sm:w-1/2 lg:w-full">
                <Link
                  href={`/ambassador/${ambassadorId}`}
                  className="w-full rounded-md bg-gray-200 px-4 py-2 text-center text-sm font-semibold text-auburnBlue-900 lg:w-fit"
                >
                  Cancel
                </Link>
                <button
                  className={classNames(
                    "w-full rounded-md bg-auburnOrange-900 px-4 py-2 text-center text-sm font-semibold text-white lg:w-fit",
                    !submitCheck ? "cursor-not-allowed opacity-50" : "",
                  )}
                  disabled={!submitCheck}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {showSumbitError && (
          <div className="fixed bottom-3 left-3 right-3 transition-all duration-300 sm:left-auto">
            <ErrorMessage message="There was an error sumbiting your rating. Please try again." />
          </div>
        )}
      </div>
    </>
  );
};

export default AddRating;
