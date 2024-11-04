import requests
import os
import fitz  # PyMuPDF for PDF to text conversion

year = "2024"
base_url = f"https://dziennikustaw.gov.pl/D{year}000"
target_directory_pdf = "downloaded_pdfs"
target_directory_txt = "extracted_txt"
os.makedirs(target_directory_pdf, exist_ok=True)
os.makedirs(target_directory_txt, exist_ok=True)

start_id = 1578
end_id = 1579

for id_number in range(start_id, end_id):
    url = f"{base_url}{id_number}01.pdf"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            file_path = os.path.join(target_directory_pdf, f"{id_number}.pdf")
            with open(file_path, "wb") as f:
                f.write(response.content)
            print(f"Downloaded: {url}")

            # Convert PDF to text
            with fitz.open(file_path) as pdf:
                text_content = ""
                for page in pdf:
                    text_content += page.get_text()

            # Save extracted text to a file
            text_file_path = os.path.join(target_directory_txt, f"{id_number}.txt")
            with open(text_file_path, "w", encoding="utf-8") as text_file:
                text_file.write(text_content)
            print(f"Extracted text saved for ID: {id_number}")

        else:
            print(f"File not found (HTTP {response.status_code}): {url}")
    except requests.RequestException as e:
        print(f"Error downloading {url}: {e}")

# 2024 ma 1579
# 2023 ma 2824
# 2022 ma 2868
# 2021 ma 2507
# 2020 ma 2463
# 2019 ma 2566
# 2018 ma 2548
# 2017 ma 2509
# 2016 ma 2306
# 2015 ma 2372
# 2014 ma 1995
# 2013 ma 1742
# 2012 ma 1555

# od 2011 w dół jest jakiś chiński format ale myślę, że i tak jest w czym przebierać :))
