import {fetchListerReviews} from "@/lib/data";
import moment from "moment";
export default async function Reviews({uid}) {
    const {reviews} = await fetchListerReviews(uid);

    if (reviews.length === 0) {
        return <div className="text-2xl font-bold">
            No reviews here!
        </div>
    }

    // return <div>Hello</div>
    return (
        // <ScrollArea className="h-72 w-full rounded-md border overflow-scroll">
        <div className="h-full max-h-[700px] w-full rounded-md  overflow-y-scroll">
            {reviews.map((review) => {
                return (
                    <div className="review-item my-5" key={review.id}>
                        <div className="review-info flex gap-4">
                            {/*<span className="font-bold">{review.uid}</span>*/}
                            {/*<span className="italic">{review.date}</span>*/}
                        </div>
                        <div className={"flex gap-2"}>
                            <div>{review.reviewerData.name}</div>
                            <div>{moment(new Date(review.date.seconds * 1000)).fromNow()}</div>
                        </div>
                        <div className="text-lg">{review.review}</div>
                    </div>
                );
            })}
        </div>
        // </ScrollArea>
    );
}
