// -----------------------------------------------------------------------------
//
// (C) 2008 European Space Agency
// European Space Operations Centre
// Darmstadt, Germany
//
// -----------------------------------------------------------------------------
//
// Sub-System    : TestUtilities
//
// File Name     : BytesHelper.cpp
//
// Author        : Joshua Whitty (VEGA)
//
// Creation Date : 2008-10-13
//
// Update        : see bottom of file
//
// Generated from:
//
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

/// @file bytesHelper.cpp
///    Byte helper functions

#include "BytesHelper.h"
#include "SIMPACK/Common/Datatypes/DataBlock.h"
#include <iomanip>


namespace GaiaCommon
{
    namespace Utilities
    {
        namespace BytesHelper
        {
            /// Helper function that converts a passed in string to a hexadecimal array of bytes
            void ParseString(Smp::String8 str, ::SIMPACK::Common::Datatypes::DataBlock* dataBlock)
            {
                assert(str && dataBlock);
                Smp::UInt32 length = 0;
                Smp::Char8* data = new Smp::Char8[strlen(str) + 1];
                Smp::Char8* buff = new Smp::Char8[strlen(str) + 1];
                strcpy(buff, str);

                Smp::Char8 tokSymbols[] = ",; \n\t";
                Smp::String8 token = strtok(buff, tokSymbols);

                while (token != NULL)
                {
                    if(sscanf(token, "%x", reinterpret_cast<unsigned int*>(&(data[length]))))
                    {
                        length++;
                    }

                    token = strtok(NULL, tokSymbols);
                }

                // copy the bytes into the data block structure
                // we assume that the user has used one space between each hexadecimal number
                assert(length <= ((Smp::UInt32)(strlen(str) / 3)) + 1);
                dataBlock->set_Length(length);
                memcpy(dataBlock->get_Data(), data, length);

                delete [] buff;
                buff = NULL;

                delete [] data;
                data = NULL;
            }

            /// Helper function that logs the contents of the passed in byte array as a space separated hexadecimal string
            void ParseBytes(::SIMPACK::Common::Datatypes::DataBlock* dataBlock, Smp::String8 prefix, std::string& str)
            {
                std::ostringstream stream;
                stream << prefix;
                stream.setf(std::ios::uppercase);
                stream << std::hex;

                for (Smp::UInt64 i = 0; i < dataBlock->get_Length(); i++)
                {
                    // print out the byte as hex
                    stream << " " << std::setw(2) << std::setfill('0') << (Smp::UInt32)dataBlock->get_Data()[i];
                }

                stream << std::ends;

                // assign the string
                str = stream.str().c_str();
            }

            // Helper function that swaps the order of words
            void ByteSwop(::Smp::UInt16* words, const ::Smp::UInt16 count)
            {
                ::Smp::UInt8 tmp = 0;
                ::Smp::UInt8* bytes = (::Smp::UInt8*)words;

                for (int i = 0; i < count; i++)
                {
                    tmp = bytes[i * 2];
                    bytes[i * 2] = bytes[i * 2 + 1];
                    bytes[i * 2 + 1] = tmp;
                }
            }

	    // Calculates the CRC based on the passed in bytes
            ::Smp::UInt16 CalculateCrc(SIMPACK::Common::Datatypes::DataBlock* dataBlock)
            {
                ::Smp::UInt8 r[16] = { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 };
                ::Smp::UInt8 x[8];
                ::Smp::UInt8 m[8];
                ::Smp::UInt32 length = dataBlock->get_Length() - 2;

                union
                {
                    ::Smp::UInt16 word;

                    struct
                    {
                        ::Smp::UInt8 lsb;
                        ::Smp::UInt8 msb;
                    } sb;
                } crc;

                for (::Smp::UInt32 i = 0; i < length; i++ )
                {
                    m[7] = ((dataBlock->get_Data()[i] & 0x00000001));
                    m[6] = ((dataBlock->get_Data()[i] & 0x00000002) >> 1);
                    m[5] = ((dataBlock->get_Data()[i] & 0x00000004) >> 2);
                    m[4] = ((dataBlock->get_Data()[i] & 0x00000008) >> 3);
                    m[3] = ((dataBlock->get_Data()[i] & 0x00000010) >> 4);
                    m[2] = ((dataBlock->get_Data()[i] & 0x00000020) >> 5);
                    m[1] = ((dataBlock->get_Data()[i] & 0x00000040) >> 6);
                    m[0] = ((dataBlock->get_Data()[i] & 0x00000080) >> 7);

                    x[0] = (r[0] ^ m[0]);
                    x[1] = (r[1] ^ m[1]);
                    x[2] = (r[2] ^ m[2]);
                    x[3] = (r[3] ^ m[3]);
                    x[4] = (r[4] ^ m[4]);
                    x[5] = (r[5] ^ m[5]);
                    x[6] = (r[6] ^ m[6]);
                    x[7] = (r[7] ^ m[7]);

                    r[0] = ((r[8] ^ x[4]) ^ x[0]);
                    r[1] = ((r[9] ^ x[5]) ^ x[1]);
                    r[2] = ((r[10] ^ x[6]) ^ x[2]);
                    r[3] = (((r[11] ^ x[0]) ^ x[7]) ^ x[3]);
                    r[4] = (r[12] ^ x[1]);
                    r[5] = (r[13] ^ x[2]);
                    r[6] = (r[14] ^ x[3]);
                    r[7] = ((r[15] ^ x[4]) ^ x[0]);
                    r[8] = ((x[0] ^ x[5]) ^ x[1]);
                    r[9] = ((x[1] ^ x[6]) ^ x[2]);
                    r[10] = ((x[2] ^ x[7]) ^ x[3]);
                    r[11] = (x[3]);
                    r[12] = (x[4] ^ x[0]);
                    r[13] = (x[5] ^ x[1]);
                    r[14] = (x[6] ^ x[2]);
                    r[15] = (x[7] ^ x[3]);
                }

                crc.sb.msb = (r[ 0] << 7) + (r[ 1] << 6) + (r[ 2] << 5) + (r[ 3] << 4)
                           + (r[ 4] << 3) + (r[ 5] << 2) + (r[ 6] << 1) +  r[ 7];

                crc.sb.lsb = (r[ 8] << 7) + (r[ 9] << 6) + (r[10] << 5) + (r[11] << 4)
                           + (r[12] << 3) + (r[13] << 2) + (r[14] << 1) +  r[15];

                return crc.word;
            }
		
		void Write32ToBytes( const ::Smp::UInt32 word, ::Smp::UInt8* bytes )
		{
			bytes[0] = static_cast< ::Smp::UInt8>(word >> 24);
			bytes[1] = static_cast< ::Smp::UInt8>(word >> 16);
			bytes[2] = static_cast< ::Smp::UInt8>(word >> 8);
			bytes[3] = static_cast< ::Smp::UInt8>(word);
		}
            
		void Write32ToBytesReversed( const ::Smp::UInt32 word, ::Smp::UInt8* bytes )
		{
			bytes[3] = static_cast< ::Smp::UInt8>(word >> 24);
			bytes[2] = static_cast< ::Smp::UInt8>(word >> 16);
			bytes[1] = static_cast< ::Smp::UInt8>(word >> 8);
			bytes[0] = static_cast< ::Smp::UInt8>(word);
		}
            
		// utility routine to write 16-bit word to memory
		void Write16ToBytes(const ::Smp::UInt16 word, ::Smp::UInt8* bytes)
		{
			bytes[0] = static_cast< ::Smp::UInt8>(word >> 8);
			bytes[1] = static_cast< ::Smp::UInt8>(word);
		}
		
		// utility routines to read a 32-bit word from bytes
		::Smp::UInt32 Read32FromBytes(::Smp::UInt8 *block)
		{
			return (block[0] << 24) + (block[1] << 16) + (block[2] << 8) + block[3];
		}
		
		// utility routine to read a 16-bit word from memory
 		::Smp::UInt16 Read16FromBytes(::Smp::UInt8 *block)
		{
			return (block[0] << 8) +  block[1];
		}
		
		// utility routine to reverse the byte order of a 4 byte word
		void ReverseBytesIn32BitWord(::Smp::UInt32& word)
		{
			Smp::UInt8 tempBuffer[4];
			tempBuffer[0] = word & 0xff;
			tempBuffer[1] = (word >> 8) & 0xff;
			tempBuffer[2] = (word >> 16) & 0xff;
			tempBuffer[3] = (word >> 24) & 0xff;
			word = (tempBuffer[0] << 24) + (tempBuffer[1] << 16) + (tempBuffer[2] << 8) + (tempBuffer[3]);
		}
	    
		/// Invert an array of bytes to swap the endian convention of associated words. If
		/// the input represents words in little endian, the output will represent the same
		/// word in big endian.
		void EndianSwap(::Smp::UInt8* bytes, const ::Smp::UInt32 howManyWords)
		{
			::Smp::UInt8 temp;
			static const int WDB = 4;
			
			for(::Smp::UInt32 wordIndex = 0; wordIndex < howManyWords; wordIndex++)
			{
				::Smp::UInt32 WdbIndex = wordIndex*WDB;
				// Swap byte 0,3 and byte 2,3 in word (WDB is word dimension in 
				// bytes = 4). Note that a loop with WDB/2 as upper limit would
				// not save so much coding effort, so I think it's better to 
				// leave the swapping explicited byte by byte. 
				temp = bytes[WdbIndex];
				bytes[WdbIndex] = bytes[WdbIndex + WDB-1];
				bytes[WdbIndex + WDB-1] = temp;
				temp = bytes[WdbIndex+1];
				bytes[WdbIndex+1] = bytes[WdbIndex+ WDB-2];
				bytes[WdbIndex + WDB-2] = temp;
			}
		}

		// Utility to determine how many bits are set in a 2 byte word.
		// This helps to determine whether a parity bit must be set.
		::Smp::UInt8 NumberOfSetBitsIn16(::Smp::UInt16 byte)
		{
			::Smp::UInt8 numberOfSetBits = 0;

			// Iterate through all bits and tally the number bits that are set.
			for (int i = 0; i<16; i++)
			{
				// Shift bits along and take only the first bit.
				if ((byte >> (15 - i)) & 0x1)
				{
					numberOfSetBits += 1;
				}
			}

			return numberOfSetBits;
		}
        
	}
    }
}

//------------
// History
//----------
// $Log$
// Revision 1.4  2008/12/30 15:46:57  jwhitty
// Added byte swopping
//
// Revision 1.3  2008/12/11 06:53:40  aingenito
// Added log at the end of the files.
//
//------------
// History End
//------------
