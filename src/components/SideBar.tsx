import { useEffect, useState } from "react";
import { GenreResponseProps } from "../dtos";
import { Button } from "./Button";
import { api } from '../services/api';

type SideBarProps = {
  selectedGenreId: number
  handleClickButton: (id: number) => void
  setSelectedGenre: (data: GenreResponseProps) => void
};

export function SideBar({ handleClickButton, selectedGenreId, setSelectedGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>
        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}