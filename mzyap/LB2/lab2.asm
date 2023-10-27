 mvk 095A0h, a1
 mvklh 0b234h, a1
 mvk 50h, a2
 addk 4,a2;
 stw a1, *+a2[1]
 ldh *+a2[2], a3
 nop 4
 mv a3, a1