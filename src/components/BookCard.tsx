import { Book } from "@/types/book";
import { Edit2, Trash } from "lucide-react";
import Image from "next/image";
import { StarRating } from "./StarRating";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="relative w-full max-w-sm bg-white dark:bg-slate-600 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-[300px] w-full">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </CardContent>
      <CardHeader>
        <h3 className="text-lg font-semibold dark:text-white">{book.title}</h3>
        <p className="text-gray-600 dark:text-white">{book.author}</p>
        <div className="text-lg font-semibold dark:text-white">
          <StarRating
            id="star-rating"
            rating={book.rating ?? 1}
            readonly={true}
            size="20px"
          />
        </div>
        <p className="text-green-600 font-semibold mb-2">
          {book.currency} {book.price.toFixed(2)}
        </p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4 dark:text-white">
          {book.description}
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(book)}
            className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white dark:bg-blue-700"
          >
            <Edit2 />
          </Button>

          <Button
            size="icon"
            onClick={() => onDelete(book)}
            className="px-4 py-2 rounded-full bg-red-500 dark:bg-red-700 text-white hover:bg-red-600"
          >
            <Trash />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
