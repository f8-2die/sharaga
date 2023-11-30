 mvk 9,a1
 mvk -4,a2
 mvk 3,a3
 mvk 296,a5
 mvk 8,a6
m: addk -1,a1
 stw a2,*--a5[a6]
 ldw *a5,a4
 nop 4
 [a1] b m
 [a1] add a2,a3,a2
 nop 3