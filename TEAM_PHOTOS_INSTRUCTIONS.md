# Instructions: Generate AI Team Member Photos

To complete the team section, you need to generate 3 AI faces for the fictional team members.

## Required Photos:

1. **Sarah Chen** - Female, professional, approx. 30-35 years old
   - Save as: `public/images/sarah-chen.jpg`
   
2. **Alexander Kovač** - Male, professional, approx. 40-45 years old
   - Save as: `public/images/alexander-kovac.jpg`
   
3. **Luca Martinelli** - Male, professional, approx. 35-40 years old
   - Save as: `public/images/luca-martinelli.jpg`

## How to Generate AI Faces:

### Option 1: This Person Does Not Exist (Free, Simple)
1. Visit: https://thispersondoesnotexist.com/
2. Refresh the page until you find a face that matches the description
3. Right-click on the image and save it
4. Rename and save to the correct location
5. Repeat for all 3 team members

### Option 2: Generated Photos (More Control)
1. Visit: https://generated.photos/faces
2. Use filters to select gender, age, ethnicity
3. Download the face you like
4. Save with the correct filename in `public/images/`

### Option 3: Artbreeder (Customizable)
1. Visit: https://www.artbreeder.com/
2. Create custom AI faces with precise control
3. Download and save to `public/images/`

### Specifications:
- **Format**: JPG or PNG
- **Size**: At least 400x400px (square)
- **Quality**: High resolution for professional appearance
- **Style**: Professional headshot, neutral background preferred

## After Adding Photos:

1. Verify photos are in `public/images/` folder
2. Check filenames match exactly:
   - `sarah-chen.jpg`
   - `alexander-kovac.jpg`
   - `luca-martinelli.jpg`
3. Test locally: `npx http-server public -p 8080`
4. Deploy: `vercel deploy --prod --yes`

The website will automatically display these photos in the team section!


