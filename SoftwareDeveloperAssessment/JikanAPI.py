"""
    The following is an implementation of the Jikan API, an unofficial MyAnimeList API from:
    https://github.com/public-apis/public-apis

"""

import requests


"""
    Precodition: name is of form 'LastName, FirstName'
    Postcondition: return 'FirstName LastName'
"""
def swap_names(name):
    parts = name.split(',', 1)  # split at the first comma only
    swapped = parts[1].strip() + " " + parts[0]
    return swapped


"""
    Precondition: anime_id is a valid anime id from MyAnimeList
    Postcondition: Return a list of tuples, each containing the name
                    and image url of each character from the anime corresponding
                    to anime_id
"""
def get_characters(anime_id):
    response = requests.get(f"https://api.jikan.moe/v4/anime/{anime_id}/characters")

    if response.status_code == 200:
        data = response.json()["data"]
        res_list = []
        for character in data:
            name = character["character"]["name"]
            if "," in name: # if name is of form 'LastName, FirstName'
                name = swap_names(name)
            image_url = character["character"]["images"]["jpg"]["image_url"]
            res_list.append((name, image_url))

        return res_list


"""
    Precondition: anime_id is a valid anime id from MyAnimeList
    Postcondition: Returns the English title of the anime
"""
def get_name(anime_id):
    response = requests.get(f"https://api.jikan.moe/v4/anime/{anime_id}")

    if response.status_code == 200:
        names = response.json()["data"]["titles"]
        for name in names:
            if name["type"] == "English":
                return name["title"]


if __name__ == "__main__":
    print(get_characters(16498)) # get all characters from Attack on Titan
    print(get_name(16498)) # get the English name for Attack on Titan
