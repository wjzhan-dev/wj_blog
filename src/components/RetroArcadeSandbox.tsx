"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const LIL_BRO_AVATAR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAHdElNRQfqBh4THynVBcyTAAAcbElEQVRo3rWaabBl11menzXuvc94h+6+fXuQ1FK7JdwaPLSMbNkWAtuIkNiGggKDiQmgAlIuUiZFMZnkRwr/IAGC40oR7Dixy4pJFSQmqSLCcTDCxo6MjCVZtia3aamn2913PMOe1pQf+3TLDgIHJ9lVp+rcffa5Z33rm973/Zbgm7x+8S13IbUhOoft99FZxvGBMlNhjl4p6zu259WpedXcKlO6yRp9ECGG1liTmYyLs8Ztl/W0dX5DIk/bPH8ixvCIQDzWNNVZIZXLsgxSJPjIjSeO8evv+/A3tU7xt/3CL731NQgSUkja4Pjw40/wk6++66jNs3u0ye5zqFNXJrMjm9N5f157nHfMy5IYA0WeM+4P2JlN2dndI4SAtTl50aMo8nmK8Zxz7pGi33uw3x88dO7C2bMH9h1gb2cbbQzEyMc/8/j/PwN/9Ye+kwNLKzx/+SKvsKV4eJpO1j6+TfUGb6Xon6iD0JPKs7WzS4wBqRSz2YyqqnDe0e/16fV6xBip6xKAECJSKvI8R0kJApRSXin1zGDQ/5gP4aO//4cPfel73nR3mteeXm742Mc//f/WwH/2g29EKoUgMW0aLNxQt+39dUpvDza/LuUD5i7QNJ66aajrGgGEEHCuxfvIbDZBa0V/OAKgbVpiDFhjiTGitUZrjZSClBIpRpRW9Ir8+RjiR6SU7xdSnkEqfAis7jvABx/4/W+4dvWNHviX97+FedlgjQZipqX6wQbxvjLxfaEYjZ3p0yLJe31CSngf8CHgnCPGiBACISRaaxASpRRCSpCS4DxCCPI8x2iNtRatNUIIlFI45wkxjvv9weuk0t8eQpwmKZ9ZXtkfYtvy2tffzZ8/8ug3b+ADP/8jDIoMrRV12x6OkV+tk/iV3aiO+KyPF5rGRcZLyyhtmM/n1HWDkILgA1opYgggQAhICRKJBAsDHK1rEVIghMDajKzIkUqjtcI7R4yJmBJa6zXv/X1Zlh0cjlceFUZNi+GQO195O5/78y/87Q184Fd+hoTA+4gQ4WUx8W8aqb9/00uz1wSUzWh9ZLS8AkIwmezRtg0hBrz3WGOoyhLftlgtkUJQzkuaukGkzsh5OSfFRNu2tM6RSAyHI5RShBBJMSGVJKZ0NZ9Mlud3Fr3ey4XWj/XyfOPs2XO89JaX8OWnnn1RO+SL3Tz+0x/jaXUzv/X8DQx69rV5ln84SHHvmZ0ZF3f2aJ1nc3OHmOiqG4KyrIgxkVKkbSu2NzcoZ7vI5OlpyVIvJ1N0f1vNMMuxWpMZg9UG17ZMJ1PqqmY0HLNv/xpZb4CxOUob6rohhNDltm/v7ffyD2trX/vj7/gB7nvTPXzq47/7ogbq//3GH3/2Yf5wdif9P3onI3P9a3ecfX9f+VuuzGq25yU+Jq7GnLUZTdMwn89JJKpqRjmbUM4m+KZm1B+wNCjoZZoiN7hhzlwnVkYDbNajqeYoJen3ely4skVMkvlkxqwYsLSyQr8/oK5rYgz41uGdJ3iHIKGkvO0rzz77fldP7//nv/mBT6eUEOJtpIW3XzREf/HADWy+91/w8WdOc+nGu1/23K76wCE9O7miSnZrx8wFGt/lnM27nZ1O9mjqmt3tTeazXZpyigyO5UGPpUGPfaMBK8Mey/0CkSJWGdZWllgdjUjO0c8Mq0tDlACjFCyiYDqd0TQ1KS5CTQiKIkcJgURQNzUXNi7tC5E7J5PpZz/07z+4cXB9DYDZbP7iHrxrHPHf++P804P7Dn9qev43nqvkbXteMm9bXEjUVcN4aUR/MGQ2nTCf7JC8p5rPEa5lZBTa9CiMYtwrGBQFy8MhVkvyIsMoaFrP6soyRltCPUJKwXA0YJBpaueZVw2YnCYKqjagrUUIQX9pGZtZvGuZ7m4jqoq9vSlPPHX6trpqfqNu3I8A55X6+qy7ZqD/re/hwQ8+wdZ/+IOsvG7/L69mq/fuW7sLG+Y03lE2jhTBlxWT5hJNWaJVAt9gfMu+ccEoVygRMUqxNBgy6vXIjMXarsdZAUorVldXiQlEDEgpMUaz1LOEEGicIylBi+HCdsWVvRKMxRiLFBKjNTF4ZBJ458isRUl1b0rpl1NK7wKaQ4cOcuHCxgsG/tCP/hPUzyQ++Y+e4N1/95bve/ry/B2xanl9sclK5nCto2xagmtpQoOWgmGmsDJhMk221GNp0McqgUgJpSSjfp9hkWG0psgsSkrGuSHLMlb276eqWwpjQYBvW0JweO+IIaCUQBU9CrlLPd3FJUloS/Zme8QQSNEzGC7RL3Iub+8SuzB+B/BnMcYHrLWsr69x8eKlLgfXbrqH0w+fZnTPoRu+CO/7rxfmR76UCV56YsDAROZt4PzunBA8UggylVjta5Z7OftGQ1YGfUa9gl6WUeQZvSJn1CvoZ5Z+nlFYQ2Y0/SKnyDP6/SECQZFZepklM4rMKKwCqyS93JJpSaYERgvmVUWKkdl8SgiOXlHQy/tMy4qdvSk+RAAjpTwupXwwxrgbY2Q+L9F3fse7IHp+/tcfEN/xbd9//9NPfOH29aHix77zTlYGmhATQki863bZSsE4Nyz1C4a9Hj1rsFqhpEJJ0EqilFwsXJNZgxQSrRb1TID3jhQ9SgpIAmUN0QicTDTiau+LjHsZxw6u4tqWvcbjXU4dEtZYXNswnUyRogMJMUZijLcLIe733r9bKZUOH15HD0ZDlNZ87w/86sli6ca3H1i7yKkjsNS3pEW4hRAo53Na5+j3DONen2Evp5dZrJZYo9BCdMbJzhij5cKARAgeJWWHMVOkmk3wPmCsRQhAJIQAKSVaS6QUeJewSrLSzzm8MsJM5vgAu60g7w1IUqFsRkppgV87DCuEeLvW+qMppScmkwlSScVP/tjfJ8+zt0mVX2eXT3CmOczTW5a9RtCERNm0VFUNKWK0oJ9rMi0747TCSEFmdMcG6BYaY8R7T1M3VFXJ3t6E+XxOOZsz3Zswn04pZ1PK+YxqXtLWDc45RAIl5ALDgpKC5VHBUi9jYAX4ChED+9dv4Obb70YoQwiRsiyp6xrn3HXOubetrKyglEK33vPe3/l3R6UUb93b3aV1sJnG/Mk5y4FdyUoRqfamNM7RVxatBJmWGCVRApRIKCGvNVghBN57QkrEEEkxEkMkhIBahGlKCQTYRmOt+Rpc1UWBSWrxfAe8c6vp5ZrMSEQK1PMp3geuO/kmjj6/yVOPfoKUEtZmVFWJlPKtZ8+e/W0hxFmdUiCEeE9Z1ifqtsXYDGstHrhUKi7NArKUmCQ6MKh1F/ckJJHuXSTGBEIgIsSUiCEQQ8D7QAiBGBNKvGCgEIKmadFaoo1CSYGQEq8lzkuEAGNAyG6TjJLkWtPPDFWEFCM+5bz2vnewefEpJtuXUFphraF17oRW+p4Q/EdkP+8b79x9IQQtpUTIDtxKIUkp4kMgoYlCIgUU1mCUQgnRoYoFTYgpEkMgeI9rW5qmpalb2sbRNh7XOJoFV6zrhqZpcc7TtI6qaqiqtrvftjjnuvBuGpxrCTEgBZ2BRqNIaGVxEUqxyvE73oCQAikk1hhGw6EuiuK+Qe+Q0Tu7m0djTKe899dCLAExRlLsvAASoQxKJqzuioiWAim4yoEgJVJKBB8J3l9jA+FqmC6aVVo8l5JESEgIUoIYJQqJ8AkpEqBIi43ryLZASUmmFar1VC5S1Y6nN66wfOhVCPMHzKbbFEWBBLTKTp04cftRmVK6I6V0RMmuekGCFInBkWIAApEIQqOEwEiJXGDDLlQXm5ESKXZMPIRASpFERMh0TTe4mqdXjYwxEkIkhNTxvhBf+CwlQJIShNDRq0QEEinBdD5ne/sKwVXYwUGOHH9l5+0QSCmxsrL/yF3f+oY7pJTylNKqb43GGtOV81DTVDukUJNig28rhNRkxiKlgtSV9WuLpcu7EMM1T33tdZWhX32Jrjd0LJj0NQYnvF94PSWkVEip4eoepXQtHZzzuKbl4P4xg6LHbafuQ5sC7x2IxMG1o/0ja7eckvOyvHVellRVRdvUuGZKM7+MTCVaelSsScFBEhjTVTwhJUK8AGrFwtAQIj6GhacEAokQiqu5LZW8Zqy4GgHya8Gx6EI8LryHQCmN1qbblAUTCjHg2hpiS2hLmvku19/0So4e+xZaV6GV4uSJV1Po8a1aKXVTXOyiQCCkYLh0AN+WpBSY7l1kaThCeI2gKyTdwjoPXDWuawWRFCHF7v7VXiaEfCH3ROgKwuK3OveIayErpUTQeU5rc21TXYiLFOrkkGo+oQxnWdIG7/t4v8bLXnEP7fQSd73yPm478Xpa527SNssOhhg7BGI0So1pqyltU3VFJkacq8hTIMUuE8SiESMEISYaFyhrT4oRYhdGUoKSsjNksRFduEqE+PpcXGwtkYQiEYVG2YKsKMhyQ/SB1rVk1qCExLUOLRpetfwct65tYQfLDFYbXn/fKd50670ouYLJBtTt3kGdZflQCBbIo6Wazagm28TQEKIjCYNzjiADKQnsNXlP4YJnVtY0TaCsWpq2oXUeKcFqvehdHdC2Sl/LN7mAbc4HGh9ovSMliWs9SinGSYMyaGOQSqAkFEVGv2kRAoL3HFxqObm6xdFiytJShe0pnpyvY+wBXO1RIQAM9cjOzKwKzKc1VTWjLWe4troWXlZJ+qJBpIiShiLLyawhkSjrhhCveoVr/UtKCTEShCCarvJppTsB6GsqqQ+eum2pG0cMCd8GlFYoLdESjJTEkJNZTa+XMR6DkJsoEvttg4iaz144RLX3EmbnDtPmI04uJZJroZGE4I0ezZ+ANmdrKqjmDTEGQKCMJbeaU/2KUQp8tfIYobFGo43CeYfWmizTeOdRRHI9WCzcEX1A6QWTWCjWAgEL78UYEVKQW4NWihQizjisybBaIVMkOkd0GpUbrLUopTGmYy0ytngHX9kb89z0ANpaVveXtAf7iG0HjSCFgD7E065gbE+XY5zP0Fpj8h62N+bGLPBqM8XlBu17OB8wWiAkZNZQZB3jqFNE55poBDElWt+FG0giIJS4lrud9yJSS/TVfBWKpBT9olPaOhFYd4bIrpsoITCZxWrFwZUlrsQhYS+x3p/yld05ISSqMqPqFeQm4r0gRe90VbfTgdldvfOQY6PeR8yX2YmroAw3q036QnHG9rl+teLi5h5Gg1aQ6Y49NG1LkyK705Izl3Z4fmvK9qwmITm2f8iN+wb0ezmZsV2zFulaC3Sto6odz23OeOLsJkIZDo57HNs/5oYDY1a1QsSITBFiRBnDMDek5SGf21ymnFWMle3yPjQ07YxSWrKiT9xVhOim+pHL12/sH/nVbzt+mZPZgEe2BszLPiYFDinHY6Xlq+S8+bDCuQYtITNdPlXlnMnuhK3tPc5emXBup+T8TsXO3KGkAteyL9ddyA0WxDREpOjwbtM6tiYlX724xda0wlPjnSdWFZPtba4/sMQN161hdSIUGcZaVgY99uYzzm83ZOs557aGRBlJyZMIzPyMQkoyNKS0oUt78PTSajhJkfH5y9dzvl4FIZAEnmgkX6osfSLaGA7tGyMWQLvrm9DrF2RZxtr+Ve5oItPSMa8cTesIIaKN6Hqb6NTtsGjgHZSDwipO3bjG3TbHGkMvN/StQStIKUB0iJTIjIEI48IwqRIbU0+T7Ucqgc0bMIJATRUlT208yd5jZ7nhyC2n9cljK08IEd78x+fW2fFDEokQHPNqyoXSEYVA2QSqIMwnZDZHio6t20Gfpq6ZT0vqqmFeeYIHTUIoQdIKnRn6g6IDzFdZyqK5W2sWGLQD8VYJVAod8DaGfi9nZXnEwfV18l7BbF6RW0MbEyhL6wPH2OX6OONxt5/WJaY7GqWXePbs7/PUVx96Qp+d9R8JUcxDEn0hIq5tqKsp5XwXZRQSwerKEnXQzC5scvB4H7WgTjEmCF1+XMWKMUSEAL2QCnv9nCzLOxSSUufF2PVUVRTkNsP7QHQBuQDuIXhSUEghsMZCghgiSnXVuGwjUmra1lHGlpuyPTZqz+XJDeyczlhfPYATdj7dO/eIns7Kx6RU54RSNwfvqasJ5WwXIRW5GVBYxdFDB/BqSvCB6EOHSBIkF0g+IgGjJL1MY3RHgZAKbQw2sy+Q5JQQRhBjoA2eRMLESFCBIEO3AYBVmlxbBkVOnhmi97ima6GujuzUhoSgbRrOBMlzuaSotpHhRsJckVZ6HLz+5eeeevRTj8mL558727rmEakEbT1jPt0hJSj6Y4wtuPG6dZaWxtRRsLR/GWsVpLCgUwmrDQaFDAIdwdARYSU7eBacJ3qPEZJRUbC2tMzqcESuNISIiAmJQClJpjU9m5EbS7/IuuqbZWRZhhQS37aUs4oke3jncE0JKXK2jozCjJGC1jnmVc3Jb33rI6HlrByvrrm6rR9MMfmmKamqOUV/TFYMGAxyjhxa5cm/vMTjZ/ZYv26dTEvqeUVTNYiQiI2nndXE2iFcgBAgJqIP1FVF8p5MSgotkdHjqikqOgZGo0Kkmle4tkWmhJLdgNRqTaYUVsguHWT3QoBQhnntqeYTonekkNgsGw6KmjXR0DQV5WzqR6uHH3znr/+p0z4kpLIPOR+fmU2nL/XOkRcDhDDkWc6zz23y/LktVnNHnXKWCoF3HkknnbfzitD4jhwvaFJKEuc7kWl1aYwVgnqy03HFrr7QHw5YX12GzR12yxIREwpBRJAERC+pZhUpdRRKWYMSgigNZ7cv0bQNpj/EB8/cV/T6kn6ooN1l50rzzLkzxUMpRdThE6/h2Yc/NMmXbjy8s33pdYPhmOWVNRLgXGQyrwjBUTWOb1kzHBorYhKdl1zA1y3Bx8XcVpCEpAmJxgdya8it4cqVLTY2dlDSEALM5jVXtjYxWhETND7ivUPEiEiRFDzEhcbjOtEq0fHHZy9O+dhjF/FItNS03rEiW161BEdkyRF3hbzcev97/+Mv/Of3FTegm6oiP3gXG5fOflQq+fZiuHRdJ4ULtNWEusW7Bu8bvvB84uT+Yee9q5BLSpRWJB+JEVxMzOsaYzMALl2+QlM7prVjdnGzE4MVJAJhc4e86KGNpnEtZVuje0VXQFw3B0wpgZJIYxBCcvrKhNK3aKVp6jkuQW9fgYo1drbNkcTzq7PZR//tHXeT9l2PvO2OVxCio730uS8JbT8ync9x3pFEwrmW6d42vilpqhl/9OhzPHx6F2JChIRIIJREaYmQCkeibFsQsht7KY3JcobjEQfWlhmMC4pBxmDYZ2V1HyYvEAtCK6Xsxt8dzenAxkLiQAhiElzYmfGp0xeQ0uPaiqatu9MZNmNS1czrljrGj7zzM5//Ul1P+Inyy6invvBHyN46Znw9zoevriytfvugP1yLMeLbhksXzlBXE6pyyu50xkDDq44tk3xYDCvpJrAhUvoWTweK8zxDGY1UCqm77JICrLUYe/UzvWDwVw8pJARpwSV1V6GtQZkMbTIefm6Tj/3FczRVIAUwtke/NyYKyTozihQed779ue+47tCuSIkfffC/dOMzqQ0v/5bbmdXNGSH4teDa30mCnjWK6GrAY21GjIk2ii4flCQl2VVNBElCpAPEeZGRFxlCSlJItFWNdwEpFUKoTrJQCm0NSqlOsJIdfPNt3Wmx6qowpZDKgJBsTR3lPCCQmNyilaZtKraC5GIhyqF0v9b45ozIlziwmPVIgPbiw5y5cA7f1uDD77mm/pASUJZ7ODcjJocxhiLvs1lJmtiJRVLKTmVcqEFJCCIdaZVKMZ+1nD27xc5ORVklmjpR14GmSbQu0TrwAbIsw2YZWnfQLcSr/xGkUqAgpMjFrRnRd2pbjJG6KXGuIQTH+UZ8aKne/L0yKkY68pOf+fzXz+hnm8+ydvRlOO+CkurRGNuXXzz3zLGmnHYSfEgo22Pf6iq3r2eMbCf4Bu9x3gOJ2nl2ZjMubGzyzFcu8MUvn+XcxW3IcrLRmOG+/USbY8dLbM4qnjx9gc98/ikmk12ETMToQUAv63WnL6wh62Uoq/FScilqLs9advdKmqbs8s/kJPjknhfvejIOdo6pind//tEXn9E71zLZ3WM2uXje5vZnXT3/sM3y23TWI2E4ecsx3vCKdc5ffpL92aibTyxyLLj4Qh4JRXQeV7eUjePK5Sv0Bj2k7gjyzvlLfOXZv2RnZ4/CaCZ7UyZLBXKQMSwKisXhI2kVQiaEiEyS4KW3HefcxHH6Ly8uxgsA6Ysx8bNJiPO7qaCR4es02a87ZbF18cvceuqNyOTw0W/4tvpifzh+zdLqoX03HTvEP/6JN5K5bT738COsLffJtSDFjjaFGGl8C1Jx4MA+1g+us28wYujBhoSYN7idCc3WLs3WHn2lOLJvH8euX+emlxxmPC7QUtDPc/pFRmYW8oTVeARP77TY0RIbV3Z55quXuhGD4Clt7E+l6D8XAAd84unPfJ2Bf+WczP/8779Nb+k4WZZz3fUv+bRP8v7XvOLmf/3WN95x242Hhjy+YUkicmVekWuBodNXkKILmRjpDTK01KgyY/nQeod0WOi2AtJ4CEahRpbh2pCkAsG3RK/IrEaqjkMiBclq/uLcjDN1xsuPwIVLV0hEtJZfbJrqH+bF6NNNXZL3lrh05k//iqr+oke5XL3NYPkQxw4t8+pTJ55/59vv/ezquH+za9tjyXs2zz1HP5M0zqO07AhwN43GB0/ey7GFJetbZKaRWqIyiS40ZqDJljNG6yOGaz2kDogUMFphjMIohVEaZTT56ioHbr2Nqp8jswFGa/7TH/4ZO5PpJ1OKPxWIn8N7Qgzsbjz6Yqb89WfVyskG7/jhH+HKTs0dtxzekIJPeNcWSqmT5WTXxGZOSomyaonQzfhUR5GMMde0T2lB9CRmyZIt5+hxhh0apO1G25C672mFNQZrDNpYiv0H2XfyFYyPHGJtuMOdrzzC9mSn/B+fevwDW9vVuzJrnyVKpITZ7um/zoy/+bThQ5/6JB9+7y+hUiSRpt41nxBCnRZSHN+7dHFNd1lO1XT6qFQSYwxZZjsDF1OnGAOt9zjn8YvBaAwerSQ2yzCLTRFSIos+g+tPUBw6RjZcoppuUG49y/JYPv7SW9d/4d7X3/abX3zy4s6VSxPa6JhPz/1NJrz4YbyvvW5/3d+jbivaugJEM9vdemBp/9pbArwnxPC8MhpjM+ZVw86sZHs6Y1ZVSCHQWl0bthilu+nSQifVSqEWKrlSinlTc6VqsIeP01s7SpKS6d4Ozz/7F89Pdrbes3d56y2be+aBS5d2mg++7x/Q62vq+cY3Wv43NhDgru/6Yb717/wwPgTu+LbvYrq9eebnPvDf3i2E+G6EeI/W+svaaD+dV2zvzTl/aYvL2zv4sBiOhohKERUjekGIrerGcS5EntvY4uJexfJ1JyjGKzjX+hDCl1tXv2d3e+u73/Djv/tuH8KZgyckr7u1x/GX/RTnL5z5P1n63/5Q+kfe8zN86bOfJAnFwf370D2LqP3R4N09ZVXfN53NTznvjwgh+sNBj9XxmIHN0DIRw0Lm192gZVJVXNiaYEcr3HzbbfOVA2vnbF484rx/UCr50DN/8pGzqzfehHFnSKrPaDjm23/6Gx9j/r8y8Or1r+5/U6fLCIEk4b1DSmn2ptOjk73ZHXvT2anW+VuzLLtp2O8dHPWLoTXGxATzunKTcj7d3JtuNF6dvu/Nb37ixuPHH6nr6rHRaHg2COkAin6B9wHaXe7+/p//ptb5vwA5MMAjKQYASAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNi0wNi0zMFQxOTozMTozNyswMDowMJe5sykAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjYtMDYtMzBUMTk6MzE6MzcrMDA6MDDm5AuVAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI2LTA2LTMwVDE5OjMxOjQxKzAwOjAw2OQWaQAAAABJRU5ErkJggg==";
const BIG_BRO_AVATAR = "data:image/png;base64,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";

const FIGHT_RANGE = 70;
const HEART_INTERVAL = 1500;

/* ── Pixel helpers ── */

const HEART = [
  [0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,0,0,1,1,0,0,0],[0,1,1,1,1,0,1,1,1,1,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,1,1,0,0,0],[0,0,0,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],
];

const FIGHT_EMOJIS = ["💥","👊","💢","👊","💥","🌀","👊"];

function PixelGrid({ data, pal }: { data: number[][]; pal: string[] }) {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${data[0].length}, 4px)`, imageRendering: "pixelated" }}
    >
      {data.flat().map((c, i) => (
        <div key={i} style={{ width: 4, height: 4, backgroundColor: pal[c] }} />
      ))}
    </div>
  );
}

/* ── Main ── */

export default function RetroArcadeSandbox() {
  const boxRef = useRef<HTMLDivElement>(null);

  const [bFrac, setBFrac] = useState(0.25);
  const [aFrac, setAFrac] = useState(0.75);
  const [boxW, setBoxW] = useState(0); // 0 = not measured yet
  const [hearts, setHearts] = useState<{ id: number; left: number; dx: number }[]>([]);
  const nid = useRef(0);

  useEffect(() => {
    if (!boxRef.current) return;
    const obs = new ResizeObserver(([e]) => {
      if (e) setBoxW(e.contentRect.width);
    });
    obs.observe(boxRef.current);
    return () => obs.disconnect();
  }, []);

  const w = boxW;
  const ready = w > 0;
  const lilX = bFrac * w;   // 1/4 of box
  const bigX = aFrac * w;   // 3/4 of box
  const fighting = Math.abs(bigX - lilX) < FIGHT_RANGE;
  const midX = (bigX + lilX) / 2;

  // Hearts
  const spawnHeart = useCallback(() => {
    if (fighting) return;
    const id = nid.current++;
    const from = id % 2 === 0 ? lilX : bigX;
    const to = id % 2 === 0 ? bigX : lilX;
    setHearts((p) => [...p.slice(-4), { id, left: from, dx: to - from }]);
  }, [fighting, bigX, lilX]);

  useEffect(() => {
    const t = setInterval(spawnHeart, HEART_INTERVAL);
    return () => clearInterval(t);
  }, [spawnHeart]);

  return (
    <div
      ref={boxRef}
      className={`relative h-36 select-none overflow-hidden border-2 border-[#334] bg-[#0a0a14] font-mono ${
        fighting ? "animate-retro-shake" : ""
      }`}
    >
      {/* Scanlines + divider + ground */}
      <div
        className="absolute inset-0 pointer-events-none z-40 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff, #fff 2px, transparent 2px, transparent 4px)" }}
      />
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#222]" />
      <div className="absolute bottom-8 inset-x-0 h-[2px] bg-[#334]" />
      <p className="absolute top-2 left-4 text-[10px] text-[#556] pointer-events-none z-50">
        drag them toward each other →
      </p>

      {/* Fight FX — continuous looping */}
      {fighting && (
        <div className="absolute z-30 pointer-events-none" style={{ left: midX, top: 60, transform: "translate(-50%, -50%)" }}>
          {FIGHT_EMOJIS.map((emoji, i) => (
            <span
              key={i}
              className="absolute text-4xl animate-fight-pop"
              style={{
                left: `${(i - 3) * 28}px`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.8s",
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

      {/* Hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute pointer-events-none z-10 animate-heart-1d"
          style={{ left: h.left, bottom: 48, ["--dx" as string]: `${h.dx}px` }}
          onAnimationEnd={() => setHearts((p) => p.filter((hh) => hh.id !== h.id))}
        >
          <PixelGrid data={HEART} pal={["transparent", "#ff0040"]} />
        </div>
      ))}

      {ready && (
        <>
          {/* Lil bro — constrained to left half */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: w / 2 - 28 }}
            dragElastic={0.02}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 800, bounceDamping: 40 }}
            animate={{ x: lilX }}
            onDragEnd={(_, info) => {
              const screenX = info.point.x - (boxRef.current?.getBoundingClientRect().left ?? 0);
              setBFrac(Math.max(0.05, Math.min(0.45, screenX / w)));
            }}
            className="absolute flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing"
            style={{ left: 0, bottom: 34 }}
          >
            <div className="animate-step-bounce">
              <img
                src={LIL_BRO_AVATAR}
                alt="Lil Bro"
                width={54}
                height={54}
                className="rounded-full border-2 border-[#ff8800] pointer-events-none bg-white"
                draggable={false}
                style={{ imageRendering: "auto" }}
              />
            </div>
            <span className="text-[9px] text-[#88a] tracking-widest uppercase">lil bro</span>
          </motion.div>

          {/* Big bro — constrained to right half */}
          <motion.div
            drag="x"
            dragConstraints={{ left: w / 2, right: w - 54 }}
            dragElastic={0.02}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 800, bounceDamping: 40 }}
            animate={{ x: bigX }}
            onDragEnd={(_, info) => {
              const screenX = info.point.x - (boxRef.current?.getBoundingClientRect().left ?? 0);
              setAFrac(Math.max(0.55, Math.min(0.95, screenX / w)));
            }}
            className="absolute flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing"
            style={{ left: 0, bottom: 34 }}
          >
            <div className="animate-step-bounce">
              <img
                src={BIG_BRO_AVATAR}
                alt="Big Bro"
                width={54}
                height={54}
                className="rounded-full border-2 border-[#00aaff] pointer-events-none bg-white"
                draggable={false}
                style={{ imageRendering: "auto" }}
              />
            </div>
            <span className="text-[9px] text-[#88a] tracking-widest uppercase">big bro</span>
          </motion.div>
        </>
      )}
    </div>
  );
}
