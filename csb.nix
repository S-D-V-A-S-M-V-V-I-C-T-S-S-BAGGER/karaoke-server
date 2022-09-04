{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
  buildInputs = [ ffmpeg python3 pipenv ];
}