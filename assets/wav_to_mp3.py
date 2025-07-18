import os
import pydub
import glob

wav_files = glob.glob('audios/*.wav')

for wav_file in wav_files:
    mp3_file = os.path.splitext(wav_file)[0] + '.mp3'
    sound = pydub.AudioSegment.from_wav(wav_file)
    sound.export(mp3_file, format="mp3")
    os.remove(wav_file)

print("Conversion complete")