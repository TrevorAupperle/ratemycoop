import { type Rating } from "@prisma/client";

export type AmbassadorCalulations = {
  overallAverage: string;
  recommendPercentage: string;
  knowledgeAverage: string;
  ratingsDistribution: number[];
};

export default function ambassadorCalulations(ratings: Rating[]) {
  const calculations: AmbassadorCalulations = {
    overallAverage: "",
    recommendPercentage: "",
    knowledgeAverage: "",
    ratingsDistribution: [0, 0, 0, 0, 0],
  };

  if (ratings.length > 0) {
    const ratingsSum = ratings.reduce((total, rating) => {
      return total + rating.rating;
    }, 0);
    const ratingsAverage = ratingsSum / ratings.length;
    calculations.overallAverage = ratingsAverage.toFixed(1);

    const recommendSum = ratings.reduce((total, rating) => {
      if (rating.wouldRecommend) {
        return total + 1;
      }
      return total;
    }, 0);
    const recommendAverage = recommendSum / ratings.length;
    calculations.recommendPercentage = (recommendAverage * 100).toFixed(0);

    const knowledgeSum = ratings.reduce((total, rating) => {
      return total + rating.knowledgeRating;
    }, 0);
    const knowledgeAverage = knowledgeSum / ratings.length;
    calculations.knowledgeAverage = knowledgeAverage.toFixed(1);

    const ratingsDistribution = [0, 0, 0, 0, 0];
    ratings.forEach((rating) => {
      ratingsDistribution[rating.rating - 1]++;
    });
    ratingsDistribution.reverse();
    ratingsDistribution.forEach((rating, index) => {
      ratingsDistribution[index] = Math.round((rating / ratings.length) * 100);
    });
    calculations.ratingsDistribution = ratingsDistribution;
  }

  return calculations;
}
