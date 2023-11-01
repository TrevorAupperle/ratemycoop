import { useRouter } from "next/router";

type Major =
  | "Undecided"
  | "Aerospace"
  | "Biosystems"
  | "Chemical"
  | "Civil and Environmental"
  | "Computer Science"
  | "Software"
  | "Electrical"
  | "Computer"
  | "Industrial and Systems"
  | "Materials"
  | "Mechanical";

type Review = {
  id: number;
  majors: Major[];
  rating: number;
  knowledgeRating: number;
  communicationRating: number;
  wouldReturn: boolean;
  jokes?: boolean;
  friendly?: boolean;
  inspirational?: boolean;
  review: string;
};

type Ambassador = {
  id: number;
  name: string;
  major: Major;
  reviews: Review[];
};

const fakeReviews: Review[] = [
  {
    id: 1,
    majors: ["Software", "Mechanical"],
    rating: 5,
    knowledgeRating: 5,
    communicationRating: 5,
    wouldReturn: true,
    jokes: true,
    friendly: true,
    review: "This is a review",
  },
];

const fakePerson: Ambassador = {
  id: 1,
  name: "Trevor Aupperle",
  major: "Software",
  reviews: fakeReviews,
};

const Ambassador = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Hello {id}</h1>
    </div>
  );
};
export default Ambassador;
