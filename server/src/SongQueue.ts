import path from "path";
import youtubedl from "ytdl-core";
import ffmpeg from "ffmpeg";
import execa from "execa";

export interface Song {
  artist: string;
  name: string;
  youtubeId: string;
  processedItem?: unknown;
}

export interface Admission {
  singerName: string;
  song: Song;
}

function downloadMp3(youtubeId: string, targetLocation: string): Promise<void> {
  const stream = youtubedl("https://www.youtube.com/watch?v=" + youtubeId, {
    quality: "highestaudio",
  });

  return new Promise((resolve) => {
    // @ts-ignore
    ffmpeg(stream)
      .audioBitrate(128)
      .save(targetLocation)
      .on("end", () => {
        resolve();
      });
  });
}

export class SongQueue {
  private queue: Admission[] = [];

  public async addAdmission(admission: Admission) {
    this.queue.unshift(admission);

    if (this.queue.length === 1) {
      await this.processNextItem();
    }
  }

  async processNextItem() {
    const admissions = [...this.queue];
    admissions.reverse();

    const firstUnprocessedSong = admissions.find(
      (adm) => adm.song.processedItem
    )?.song;

    if (!firstUnprocessedSong) {
      return;
    }

    console.log("Processing song: " + firstUnprocessedSong.name);

    const url =
      "https://www.youtube.com/watch?v=" + firstUnprocessedSong.youtubeId;
    const folder = path.join(__dirname, "../songs", firstUnprocessedSong.name);
    const mp3Loc = path.join(folder, "audio.mp3");
    await downloadMp3(firstUnprocessedSong.youtubeId, mp3Loc);

    await execa("demucs", ["-d", "cpu", mp3Loc]);
  }
}
