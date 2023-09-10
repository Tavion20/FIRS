import torch
from torchvision import models
from pathlib import Path
from torch import nn
from torchvision import transforms
from PIL import Image
import sys

path = "./modelCode/vit_b_16_E5_0.8342.pt"
device = "cpu"

model = models.vit_b_16()
numFtrs = model.heads[0].in_features
model.heads = nn.Sequential(nn.Linear(numFtrs, 101, bias = True))
model = model.to(device)
model.load_state_dict(torch.load(path, map_location=torch.device("cpu")))

testTransforms = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                     std=[0.229, 0.224, 0.225])
])

dest = Path("./modelCode/classes.txt")

classNames = []
with open(dest) as file:
    classNames = file.read().split()
    
def predict(inp):
    inp = testTransforms(inp).unsqueeze(0)
    inp = inp.to(device)
    with torch.inference_mode():
        pred = torch.softmax(model(inp)[0], dim=0)
        confidences = {classNames[i]: float(pred[i]) for i in range(101)}
    return confidences

image = Image.open(sys.argv[1])

vals = predict(image)
vals = sorted(vals.items(), key=lambda item: item[1], reverse=True)

for i in range(5):
    print(vals[i])

sys.stdout.flush()
